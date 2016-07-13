/* eslint default-case: 0 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clipboard, remote } from 'electron';
import MainInput from '../../components/MainInput';
import ResultsList from '../../components/ResultsList';
import styles from './styles.css';
import define from 'lib/define';
import * as searchActions from '../../actions/search';
import escapeStringRegexp from 'escape-string-regexp';

import { debounce, bind } from 'lodash-decorators';

import {
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  WINDOW_WIDTH,
  MIN_VISIBLE_RESULTS,
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
    actions: PropTypes.shape({
      reset: PropTypes.func,
      moveCursor: PropTypes.func,
      updateTerm: PropTypes.func,
      changeVisibleResults: PropTypes.func,
      selectElement: PropTypes.func,
    }),
    results: PropTypes.array,
    selected: PropTypes.number,
    visibleResults: PropTypes.number,
    term: PropTypes.string,
    prevTerm: PropTypes.string,
  }
  constructor(props) {
    super(props);
    currentWindow().on('hide', this.props.actions.reset);
  }
  componentDidUpdate(prevProps) {
    const { results } = this.props;
    if (results.length !== prevProps.results.length) {
      // Resize electron window when results count changed
      this.updateElectronWindow();
    }
  }
  componentWillMount() {
    // Listen for window.resize and change default space for results to user's value
    window.addEventListener('resize', this.onWindowResize);
    // Listen for document keydown to handle hot keys
    document.addEventListener('keydown', this.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
    document.removeEventListener('keyDown', this.onKeyDown);
  }

  /**
   * Handle resize window and change count of visible results depends on window size
   */
  @bind()
  @debounce(100)
  onWindowResize() {
    if (this.props.results.length <= MIN_VISIBLE_RESULTS) {
      return false;
    }
    let visibleResults = Math.floor((window.outerHeight - INPUT_HEIGHT) / RESULT_HEIGHT);
    visibleResults = Math.max(MIN_VISIBLE_RESULTS, visibleResults);
    if (visibleResults !== this.props.visibleResults) {
      this.props.actions.changeVisibleResults(visibleResults);
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  @bind()
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
        currentWindow().hide();
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
  @bind()
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
   * Set resizable and size for main electron window when results count is changed
   */
  @debounce(16)
  updateElectronWindow() {
    const { results, visibleResults } = this.props;
    const { length } = results;
    const height = Math.max(Math.min(visibleResults, length), MIN_VISIBLE_RESULTS) * RESULT_HEIGHT + INPUT_HEIGHT;
    const electronWindow = currentWindow();
    // When results list is empty window is not resizable
    electronWindow.setResizable(length !== 0);
    const [width] = electronWindow.getSize();
    electronWindow.setSize(width, length === 0 ? INPUT_HEIGHT : height);
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
        <div className={styles.inputWrapper}>
          <MainInput
            value={this.props.term}
            onChange={this.props.actions.updateTerm}
          />
        </div>
        <ResultsList
          results={this.props.results}
          selected={this.props.selected}
          visibleResults={this.props.visibleResults}
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
    visibleResults: state.search.visibleResults,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
