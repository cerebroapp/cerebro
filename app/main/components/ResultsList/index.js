import React, { Component, PropTypes } from 'react'
import Row from './Row'
import styles from './styles.css'
import { VirtualScroll } from 'react-virtualized'
import { bind } from 'lodash-decorators'

import { RESULT_HEIGHT } from '../../constants/ui'

class ResultsList extends Component {
  @bind()
  rowRenderer({ index }) {
    const result = this.props.results[index]
    const attrs = {
      ...result,
      // TODO: think about events
      // In some cases action should be executed and window should be closed
      // In some cases we should autocomplete value
      selected: index === this.props.selected,
      onSelect: (event) => this.props.onSelect(result, event),
      // Move selection to item under cursor
      onMouseMove: (event) => {
        const { selected, mainInputFocused, onItemHover } = this.props
        const { movementX, movementY } = event.nativeEvent
        if (index === selected || !mainInputFocused) {
          return false
        }
        if (movementX || movementY) {
          // Hover item only when we had real movement of mouse
          // We should prevent changing of selection when user uses keyboard
          onItemHover(index)
        }
      },
      key: result.id,
    }
    return <Row {...attrs} />
  }
  renderPreview() {
    const selected = this.props.results[this.props.selected]
    if (!selected.getPreview) {
      return null
    }
    const preview = selected.getPreview()
    if (typeof preview === 'string') {
      // Fallback for html previews intead of react component
      return <div dangerouslySetInnerHTML={{ __html: preview }} />
    }
    return preview
  }
  render() {
    const { results, selected, visibleResults, mainInputFocused } = this.props
    const classNames = [
      styles.resultsList,
      mainInputFocused ? styles.focused : styles.unfocused
    ].join(' ')
    if (results.length === 0) {
      return null
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
          width={10000}
          scrollToIndex={selected}
          // Needed to force update of VirtualScroll
          titles={results.map(result => result.title)}
          // Disable accesebility of VirtualScroll by tab
          tabIndex={null}
        />
        <div className={styles.preview} id="preview">
          {this.renderPreview()}
        </div>
      </div>
    )
  }
}

ResultsList.propTypes = {
  results: PropTypes.array,
  selected: PropTypes.number,
  visibleResults: PropTypes.number,
  onItemHover: PropTypes.func,
  onSelect: PropTypes.func,
  mainInputFocused: PropTypes.bool,
}

export default ResultsList
