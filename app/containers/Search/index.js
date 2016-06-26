import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clipboard, remote } from 'electron';
import MainInput from '../../components/MainInput';
import LineResponse from '../../components/Response/LineResponse';
import styles from './styles.css';
import define from '../../lib/define';
import { updateTerm, moveCursor, reset } from '../../actions/search';

/**
 * Get current electron window
 *
 * @return {BrowserWindow}
 */
function currentWindow() {
  return remote.getCurrentWindow();
}

class Search extends Component {
  propTypes = {
    actions: {
      reset: PropTypes.func,
      moveCursor: PropTypes.func,
      updateTerm: PropTypes.func,
    },
    results: PropTypes.array,
    selected: PropTypes.integer,
    term: PropTypes.string,
    prevTerm: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    currentWindow().on('hide', this.props.actions.reset);
  }
  componentDidUpdate(prevProps) {
    if (this.props.results.length !== prevProps.results.length) {
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
      if (event.keyCode === 67) {
        // Copy to clipboard on cmd+c
        const text = this.selectedResult().clipboard;
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
    // TODO: Copy to clipboard  by cmd+c
    // TODO: autocomplete by tab and →
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
  selectedResult() {
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
  autocomplete() {
    const { term } = this.selectedResult();
    if (term) {
      this.props.actions.updateTerm(term);
    }
  }
  selectCurrent() {
    this.selectItem(this.selectedResult());
  }
  resize() {
    let height = (this.props.results.length + 1) * 60;
    height = Math.min(height, 360);
    currentWindow().setSize(600, height);
  }
  renderResults() {
    return this.props.results.map((result, index) => {
      const attrs = {
        ...result,
        // TODO: think about events
        // In some cases action should be executed and window should be closed
        // In some cases we should autocomplete value
        selected: index === this.props.selected,
        onSelect: this.selectItem.bind(this, result),
        // Move selection to item under cursor
        onMouseOver: () => this.setState({ selected: index }),
        key: result.id,
      };
      if (index <= 8) {
        attrs.index = index + 1;
      }
      return <LineResponse {...attrs} />;
    });
  }
  /**
   * Render autocomplete suggestion from selected item
   * @return {React}
   */
  renderAutocomplete() {
    const selected = this.selectedResult();
    if (selected && selected.term) {
      const regexp = new RegExp(`^${this.props.term}`, 'i');
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
        <div className={styles.resultsWrapper}>
          {this.renderResults()}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    selected: state.search.selected,
    results: state.search.results,
    term: state.search.term,
    prevTerm: state.search.prevTerm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ updateTerm, moveCursor, reset }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
