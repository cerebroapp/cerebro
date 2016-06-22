import React, { Component, PropTypes } from 'react';
import MainInput from '../components/MainInput';
import LineResponse from '../components/Response/LineResponse';
import * as plugins from '../plugins/';

import { remote } from 'electron';

const eachPlugin = (term) => {
  const promises = Object.keys(plugins).map((name) => {
    return plugins[name](term);
  });
  return Promise.all(promises).then(results => [].concat.apply([], results));
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
  }
  onFound(results) {
    // Limit to show 10 results
    results = results.slice(0, 10);
    this.setState({
      results,
      selected: 0
    });
    remote.getCurrentWindow().setSize(600, (results.length + 1) * 80);
  }
  moveCursor(diff) {
    let { selected, results } = this.state;
    selected += diff;
    selected = Math.max(Math.min(selected, results.length), 0);
    this.setState({ selected });
  }
  selectCurrent() {
    this.state.results[this.state.selected].onSelect();
    this.setState({
      results: [],
      term: '',
    })
  }
  onChange(value) {
    this.setState({
      term: value,
    });
    this.search();
  }
  onKeyDown(event) {
    switch (event.keyCode) {
      case 40:
        this.moveCursor(1);
        break;
      case 38:
        this.moveCursor(-1);
        break;
      case 13:
        this.selectCurrent();
        break;
    }
  }
  search() {
    let { term } = this.state;
    term = term.trim();
    if (term === '') {
      this.onFound([]);
    } else {
      eachPlugin(term).then(this.onFound);
    }
  }
  renderResults() {
    return this.state.results.map((result, index) => {
      const attrs = {
        ...result,
        selected: index === this.state.selected,
        key: result.id,
      }
      return <LineResponse {...attrs}/>
    });
  }
  render() {
    return (
      <div>
        <MainInput value={this.state.term} onChange={this.onChange} onKeyDown={this.onKeyDown} />
        <div>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}
