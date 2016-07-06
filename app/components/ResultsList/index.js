import React, { Component, PropTypes } from 'react';
import LineResponse from '../Response/LineResponse';
import styles from './styles.css';

import {
  RESULT_HEIGHT,
} from '../../constants/ui';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.array,
    selected: PropTypes.number,
    onItemHover: PropTypes.func,
    onSelect: PropTypes.func,
  }
  componentDidUpdate(prevProps) {
    const { selected } = this.props;
    if (selected !== prevProps.selected) {
      // Scroll to selected element if it is not visible
      this.scrollToItem(selected);
    }
  }
  /**
   * Scroll results wrapper to selected element if it is not visible
   * @param  {Integer} index Index of element that should be shown
   */
  scrollToItem(index) {
    const position = index * RESULT_HEIGHT;
    const { scrollTop } = this.refs.list;
    const resultsHeight = parseInt(window.getComputedStyle(this.refs.list).height, 10);
    if (position < scrollTop) {
      this.refs.list.scrollTop = position;
    } else if (position >= resultsHeight + scrollTop) {
      this.refs.list.scrollTop = Math.abs(resultsHeight - position - RESULT_HEIGHT);
    }
  }
  renderList() {
    return this.props.results.map((result, index) => {
      const attrs = {
        ...result,
        // TODO: think about events
        // In some cases action should be executed and window should be closed
        // In some cases we should autocomplete value
        selected: index === this.props.selected,
        onSelect: () => this.props.onSelect(result),
        // Move selection to item under cursor
        onMouseMove: (event) => {
          if (index === this.props.selected) {
            return false;
          }
          const { movementX, movementY } = event.nativeEvent;
          if (movementX || movementY) {
            // Hover item only when we had real movement of mouse
            // We should prevent changing of selection when user uses keyboard
            this.props.onItemHover(index);
          }
        },
        key: result.id,
      };
      if (index <= 8) {
        attrs.keycode = index + 1;
      }
      return <LineResponse {...attrs} />;
    });
  }
  render() {
    return (
      <div className={styles.resultsList} ref="list">
        {this.renderList()}
      </div>
    );
  }
}
