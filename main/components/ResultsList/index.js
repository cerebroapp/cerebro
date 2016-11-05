import React, { Component, PropTypes } from 'react';
import Row from './Row';
import styles from './styles.css';
import { VirtualScroll } from 'react-virtualized';
import { bind } from 'lodash-decorators';

import {
  RESULT_HEIGHT,
  RESULT_WIDTH,
  WINDOW_WIDTH,
} from '../../constants/ui';

export default class ResultsList extends Component {
  static propTypes = {
    results: PropTypes.array,
    selected: PropTypes.number,
    visibleResults: PropTypes.number,
    onItemHover: PropTypes.func,
    onSelect: PropTypes.func,
    mainInputFocused: PropTypes.bool,
  }

  @bind()
  rowRenderer({ index }) {
    const result = this.props.results[index];
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
    return <Row {...attrs} />;
  }
  renderPreview() {
    const selected = this.props.results[this.props.selected];
    return selected.getPreview ? selected.getPreview() : null;
  }
  render() {
    const { results, selected, visibleResults, mainInputFocused } = this.props;
    const classNames = [
      styles.resultsList,
      mainInputFocused ? styles.focused : styles.unfocused
    ].join(' ');
    if (results.length === 0) {
      return null;
    }
    return (
      <div className={styles.wrapper}>
        <VirtualScroll
          ref="list"
          className={classNames}
          height={visibleResults * RESULT_HEIGHT}
          overscanRowCount={2}
          rowCount={results.length}
          rowHeight={RESULT_HEIGHT}
          rowRenderer={this.rowRenderer}
          width={RESULT_WIDTH}
          scrollToIndex={selected}
          // Needed to force update of VirtualScroll
          titles={results.map(result => result.title)}
          // Disable accesebility of VirtualScroll by tab
          tabIndex={null}
        />
        <div className={styles.preview} id='preview'>
          {this.renderPreview()}
        </div>
      </div>
    );
  }
}
