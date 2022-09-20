import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'react-virtualized'
import { RESULT_HEIGHT } from 'main/constants/ui'

import Row from './Row'
import styles from './styles.module.css'

function ResultsList({
  results, selected, visibleResults, onSelect, mainInputFocused, onItemHover
}) {
  const rowRenderer = ({ index, key, style }) => {
    const result = results[index]
    const attrs = {
      ...result,
      // TODO: think about events
      // In some cases action should be executed and window should be closed
      // In some cases we should autocomplete value
      selected: index === selected,
      onSelect: (event) => onSelect(result, event),
      // Move selection to item under cursor
      onMouseMove: (event) => {
        const { movementX, movementY } = event.nativeEvent
        if (index === selected || !mainInputFocused) return false

        if (movementX || movementY) {
          // Hover item only when we had real movement of mouse
          // We should prevent changing of selection when user uses keyboard
          onItemHover(index)
        }
      },
    }
    return <Row key={key} style={style} {...attrs} />
  }

  const renderPreview = () => {
    const selectedResult = results[selected]
    if (!selectedResult.getPreview) return null

    const preview = selectedResult.getPreview()

    if (typeof preview === 'string') {
      // Fallback for html previews intead of react component
      return <div dangerouslySetInnerHTML={{ __html: preview }} />
    }
    return preview
  }

  const classNames = [styles.resultsList, mainInputFocused ? styles.focused : styles.unfocused].join(' ')
  if (results.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <List
        className={classNames}
        height={visibleResults * RESULT_HEIGHT}
        overscanRowCount={2}
        rowCount={results.length}
        rowHeight={RESULT_HEIGHT}
        rowRenderer={rowRenderer}
        width={(results[selected] !== undefined && results[selected].getPreview) ? 250 : 10000}
        scrollToIndex={selected}
        // Disable accesebility of VirtualScroll by tab
        tabIndex={null}
      />
      <div className={styles.preview} id="preview">
        {renderPreview()}
      </div>
    </div>
  )
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
