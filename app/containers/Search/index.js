import React, { Component, PropTypes } from 'react';
import { clipboard } from 'electron';
import MainInput from '../../components/MainInput';
import LineResponse from '../../components/Response/LineResponse';
import * as plugins from '../../plugins/';
import styles from './styles.css';
import define from '../../lib/define';

import { remote } from 'electron';

/**
 * Get current electron window
 *
 * @return {BrowserWindow}
 */
function currentWindow() {
  return remote.getCurrentWindow();
}

const eachPlugin = (term, callback) => {
  // TODO: somehow set priority to plugins
  Object.keys(plugins).map((name) => {
    plugins[name](term, callback);
  });

};

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      selected: 0,
      term: '',
    };
    this.search = this.search.bind(this);
    this.onFound = this.onFound.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    currentWindow().on('hide', this.reset.bind(this));
  }
  onFound(term, result) {
    if (term != this.state.term) {
      // Do not show this result if term was changed
      return;
    }
    let { results } = this.state;
    if (results.length >= 10) {
      return;
    }
    if (!Array.isArray(result)) {
      result = [result];
    }
    results = [...results, ...result].slice(0, 10);
    this.setState({ results });
    this.resize();
  }
  resize() {
    let height = (this.state.results.length + 1) * 60;
    height = Math.min(height, 360);
    currentWindow().setSize(600, height);
  }
  /**
   * Move highlighted cursor to next or prev element
   * @param  {Integer} diff 1 or -1
   */
  moveCursor(diff) {
    let { selected, results } = this.state;
    selected += diff;
    selected = Math.max(Math.min(selected, results.length - 1), 0);
    this.setState({ selected });
  }
  selectedResult() {
    return this.state.results[this.state.selected];
  }
  reset() {
    this.setState({
      results: [],
      term: '',
    }, this.resize);
  }
  /**
   * Select item from results list
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  selectItem(item) {
    this.reset();
    item.onSelect();
  }
  autocomplete() {
    const { term } = this.selectedResult();
    if (term) {
      this.setState({
        term,
        results: [],
        selected: 0,
      }, this.search);
    }
  }
  selectCurrent() {
    this.selectItem(this.selectedResult());
  }
  onChange(term) {
    this.setState({
      term,
      results: [],
      selected: 0
    }, this.search);
  }
  onKeyDown(event) {
    if (event.metaKey) {
      if (event.keyCode === 68) {
        // define word on cmd+d
        define(this.state.term);
        event.preventDefault();
        return;
      }
      if (event.keyCode === 67) {
        // Copy to clipboard on cmd+c
        const text = this.selectedResult().clipboard;
        if (text) {
          clipboard.writeText(text);
          this.reset();
        }
        event.preventDefault();
        return;
      }
      if (event.keyCode >= 49 && event.keyCode <= 57) {
        // Select element by number
        const number = Math.abs(49 - event.keyCode);
        const result = this.state.results[number];
        if (result) {
          return this.selectItem(result);
        }
      }
    }
    // TODO: Copy to clipboard  by cmd+c
    // TODO: autocomplete by tab and →
    switch (event.keyCode) {
      case 9:
        event.preventDefault();
        this.autocomplete();
        break;
      case 40:
        this.moveCursor(1);
        event.preventDefault();
        break;
      case 38:
        this.moveCursor(-1);
        event.preventDefault();
        break;
      case 13:
        this.selectCurrent();
        break;
      case 27:
        currentWindow().blur();
        break;
    }
  }
  search() {
    let { term } = this.state;
    if (term === '') {
      this.reset();
    } else {
      eachPlugin(term, this.onFound);
    }
  }
  renderResults() {
    return this.state.results.map((result, index) => {
      const attrs = {
        ...result,
        // TODO: think about events
        // In some cases action should be executed and window should be closed
        // In some cases we should autocomplete value
        selected: index === this.state.selected,
        onSelect: this.selectItem.bind(this, result),
        // Move selection to item under cursor
        onMouseOver: () => this.setState({selected: index}),
        key: result.id,
      }
      if (index <= 8) {
        attrs.index = index + 1;
      }
      return <LineResponse {...attrs}/>
    });
  }
  /**
   * Render autocomplete suggestion from selected item
   * @return {React}
   */
  renderAutocomplete() {
    const selected = this.selectedResult();
    if (selected && selected.term) {
      const regexp = new RegExp(`^${this.state.term}`, 'i');
      if (selected.term.match(regexp)) {
        // We should show suggestion in the same case
        const term = selected.term.replace(regexp, this.state.term);
        return <div className={styles.autocomplete}>{term}</div>
      }
    }
  }
  render() {
    return (
      <div className={styles.search}>
        { this.renderAutocomplete() }
        <MainInput value={this.state.term} onChange={this.onChange} onKeyDown={this.onKeyDown} />
        <div className={styles.resultsWrapper}>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}
