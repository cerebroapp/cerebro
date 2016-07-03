/* eslint default-case: 0 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clipboard, remote } from 'electron';
import MainInput from '../../components/MainInput';
import ResultsList from '../../components/ResultsList';
import styles from './styles.css';
import define from '../../lib/define';
import * as searchActions from '../../actions/search';
import escapeStringRegexp from 'escape-string-regexp';

import {
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  WINDOW_WIDTH,
  VISIBLE_RESULTS,
} from '../../constants/ui';

/**
 * Get current electron window
 *
 * @return {BrowserWindow}
 */
function currentWindow() {
  return remote.getCurrentWindow();
}

class Search extends Component {
  static propTypes = {
    actions: {
      reset: PropTypes.func,
      moveCursor: PropTypes.func,
      updateTerm: PropTypes.func,
    },
    results: PropTypes.array,
    selected: PropTypes.number,
    term: PropTypes.string,
    prevTerm: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    currentWindow().on('hide', this.props.actions.reset);
  }
  componentDidUpdate(prevProps) {
    const { results } = this.props;
    if (results.length !== prevProps.results.length) {
      // Resize electron window when results count changed
      this.resize();
    }
  }
  onKeyDown(event) {
    if (event.metaKey) {
      if (event.keyCode === 68) {
        // define word on cmd+d
        define(this.props.term);
        event.preventDefault();
        return;
      }
      if (event.keyCode === 8) {
        // Clean search term on cmd+backspace
        this.props.actions.reset();
      }
      if (event.keyCode === 67) {
        // Copy to clipboard on cmd+c
        const text = this.highlightedResult().clipboard;
        if (text) {
          clipboard.writeText(text);
          this.props.actions.reset();
        }
        event.preventDefault();
        return;
      }
      if (event.keyCode >= 49 && event.keyCode <= 57) {
        // Select element by number
        const number = Math.abs(49 - event.keyCode);
        const result = this.props.results[number];
        if (result) {
          return this.selectItem(result);
        }
      }
    }
    switch (event.keyCode) {
      case 9:
        event.preventDefault();
        this.autocomplete();
        break;
      case 40:
        this.props.actions.moveCursor(1);
        event.preventDefault();
        break;
      case 38:
        if (this.props.results.length > 0) {
          this.props.actions.moveCursor(-1);
        } else if (this.props.prevTerm) {
          this.props.actions.updateTerm(this.props.prevTerm);
        }
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

  /**
   * Get highlighted result
   * @return {Object}
   */
  highlightedResult() {
    return this.props.results[this.props.selected];
  }

  /**
   * Select item from results list
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  selectItem(item) {
    this.props.actions.reset();
    item.onSelect();
  }

  /**
   * Autocomple search term from highlighted result
   */
  autocomplete() {
    const { term } = this.highlightedResult();
    if (term) {
      this.props.actions.updateTerm(term);
    }
  }
  /**
   * Select highlighted element
   */
  selectCurrent() {
    this.selectItem(this.highlightedResult());
  }
  /**
   * Resize search window, when results lists changed
   */
  resize() {
    const { length } = this.props.results;
    const height = INPUT_HEIGHT + Math.min(length, VISIBLE_RESULTS) * RESULT_HEIGHT;
    currentWindow().setSize(WINDOW_WIDTH, height);
  }
  /**
   * Render autocomplete suggestion from selected item
   * @return {React}
   */
  renderAutocomplete() {
    const selected = this.highlightedResult();
    if (selected && selected.term) {
      const regexp = new RegExp(`^${escapeStringRegexp(this.props.term)}`, 'i');
      if (selected.term.match(regexp)) {
        // We should show suggestion in the same case
        const term = selected.term.replace(regexp, this.props.term);
        return <div className={styles.autocomplete}>{term}</div>;
      }
    }
  }
  render() {
    return (
      <div className={styles.search}>
        {this.renderAutocomplete()}
        <MainInput
          value={this.props.term}
          onChange={this.props.actions.updateTerm}
          onKeyDown={this.onKeyDown}
        />
        <ResultsList
          results={this.props.results}
          selected={this.props.selected}
          onItemHover={this.props.actions.selectElement}
          onSelect={this.selectItem}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selected: state.search.selected,
    results: state.search.resultIds.map(id => state.search.resultsById[id]),
    term: state.search.term,
    prevTerm: state.search.prevTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
