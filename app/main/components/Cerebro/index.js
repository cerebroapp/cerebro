/* eslint default-case: 0 */

import React, {
  useEffect, useRef, useState
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { clipboard, BrowserWindow } from 'electron'
import { focusableSelector } from '@cerebroapp/cerebro-ui'
import escapeStringRegexp from 'escape-string-regexp'

// import debounce from 'lodash/debounce'

import getWindowPosition from 'lib/getWindowPosition'
import {
  WINDOW_WIDTH,
  INPUT_HEIGHT,
  RESULT_HEIGHT,
  MIN_VISIBLE_RESULTS,
} from 'main/constants/ui'
import * as searchActions from 'main/actions/search'

import MainInput from '../MainInput'
import ResultsList from '../ResultsList'
import StatusBar from '../StatusBar'
import styles from './styles.module.css'

const remote = process.type === 'browser'
  ? { getCurrentWindow: BrowserWindow.getFocusedWindow }
  : require('@electron/remote')

/**
 * Wrap click or mousedown event to custom `select-item` event,
 * that includes only information about clicked keys (alt, shift, ctrl and meta)
 *
 * @param  {Event} realEvent
 * @return {CustomEvent}
 */
const wrapEvent = (realEvent) => {
  const event = new CustomEvent('select-item', { cancelable: true })
  event.altKey = realEvent.altKey
  event.shiftKey = realEvent.shiftKey
  event.ctrlKey = realEvent.ctrlKey
  event.metaKey = realEvent.metaKey
  return event
}

/**
 * Set focus to first focusable element in preview
 */
const focusPreview = () => {
  const previewDom = document.getElementById('preview')
  const firstFocusable = previewDom.querySelector(focusableSelector)
  if (firstFocusable) { firstFocusable.focus() }
}

/**
 * Check if cursor in the end of input
 *
 * @param  {DOMElement} input
 */
const cursorInEndOfInut = ({ selectionStart, selectionEnd, value }) => (
  selectionStart === selectionEnd && selectionStart >= value.length
)

const electronWindow = remote.getCurrentWindow()

/**
   * Set resizable and size for main electron window when results count is changed
   */
const updateElectronWindow = (results, visibleResults) => {
  const { length } = results
  const win = electronWindow
  const [width] = win.getSize()

  // When results list is empty window is not resizable
  win.setResizable(length !== 0)

  if (length === 0) {
    win.setMinimumSize(WINDOW_WIDTH, INPUT_HEIGHT)
    win.setSize(width, INPUT_HEIGHT)
    win.setPosition(...getWindowPosition({ width }))
    return
  }

  const resultHeight = Math.max(Math.min(visibleResults, length), MIN_VISIBLE_RESULTS)
  const heightWithResults = resultHeight * RESULT_HEIGHT + INPUT_HEIGHT
  const minHeightWithResults = MIN_VISIBLE_RESULTS * RESULT_HEIGHT + INPUT_HEIGHT
  win.setMinimumSize(WINDOW_WIDTH, minHeightWithResults)
  win.setSize(width, heightWithResults)
  win.setPosition(...getWindowPosition({ width, heightWithResults }))
}

const onDocumentKeydown = (event) => {
  if (event.keyCode === 27) {
    event.preventDefault()
    document.getElementById('main-input').focus()
  }
}

function Autocomplete({ autocompleteCalculator }) {
  const autocompleteTerm = autocompleteCalculator()

  return autocompleteTerm
    ? <div className={styles.autocomplete}>{autocompleteTerm}</div>
    : null
}

Autocomplete.propTypes = {
  autocompleteCalculator: PropTypes.func.isRequired,
}

/**
 * Main search container
 *
 * TODO: Remove redux
 * TODO: Split to more components
 */
function Cerebro({
  results, selected, visibleResults, actions, term, prevTerm, statusBarText
}) {
  const mainInput = useRef(null)
  // const [electronWindow] = useState(() => remote.getCurrentWindow())
  const [mainInputFocused, setMainInputFocused] = useState(false)
  const [prevResultsLenght, setPrevResultsLenght] = useState(() => results.length)

  const focusMainInput = () => mainInput.current.focus()

  // suscribe to events
  useEffect(() => {
    focusMainInput()
    updateElectronWindow(results, visibleResults)
    // Listen for window.resize and change default space for results to user's value
    window.addEventListener('resize', onWindowResize)
    // Add some global key handlers
    window.addEventListener('keydown', onDocumentKeydown)
    // Cleanup event listeners on unload
    // NOTE: when page refreshed (location.reload) componentWillUnmount is not called
    window.addEventListener('beforeunload', cleanup)
    electronWindow.on('show', focusMainInput)
    electronWindow.on('show', () => updateElectronWindow(results, visibleResults))

    // function to be called when unmounted
    return () => {
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('keydown', onDocumentKeydown)
      window.removeEventListener('beforeunload', cleanup)
      electronWindow.removeListener('show', focusMainInput)
      electronWindow.removeListener('show', () => updateElectronWindow(results, visibleResults))
    }
  }, [])

  if (results.length !== prevResultsLenght) {
    // Resize electron window when results count changed
    updateElectronWindow(results, visibleResults)
    setPrevResultsLenght(results.length)
  }

  /**
   * Handle resize window and change count of visible results depends on window size
   */
  const onWindowResize = () => {
    if (results.length <= MIN_VISIBLE_RESULTS) return false

    let maxVisibleResults = Math.floor((window.outerHeight - INPUT_HEIGHT) / RESULT_HEIGHT)
    maxVisibleResults = Math.max(MIN_VISIBLE_RESULTS, maxVisibleResults)
    if (maxVisibleResults !== visibleResults) {
      actions.changeVisibleResults(maxVisibleResults)
    }
  }

  /**
   * Handle keyboard shortcuts
   */
  const onKeyDown = (event) => {
    const highlighted = highlightedResult()
    // TODO: go to first result on cmd+up and last result on cmd+down
    if (highlighted && highlighted.onKeyDown) highlighted.onKeyDown(event)

    if (event.defaultPrevented) { return }

    const keyActions = {
      select: () => selectCurrent(event),

      arrowRight: () => {
        if (cursorInEndOfInut(event.target)) {
          if (autocompleteValue()) {
            // Autocomplete by arrow right only if autocomple value is shown
            autocomplete(event)
          } else {
            focusPreview()
            event.preventDefault()
          }
        }
      },

      arrowDown: () => {
        actions.moveCursor(1)
        event.preventDefault()
      },

      arrowUp: () => {
        if (results.length > 0) {
          actions.moveCursor(-1)
        } else if (prevTerm) {
          actions.updateTerm(prevTerm)
        }
        event.preventDefault()
      }
    }

    // shortcuts for ctrl+...
    if ((event.metaKey || event.ctrlKey) && !event.altKey) {
      if (event.keyCode === 67) {
        // Copy to clipboard on cmd+c
        const text = highlightedResult()?.clipboard || term
        if (text) {
          clipboard.writeText(text)
          actions.reset()
          if (!event.defaultPrevented) {
            electronWindow.hide()
          }
          event.preventDefault()
        }
        return
      }

      // Select element by number
      if (event.keyCode >= 49 && event.keyCode <= 57) {
        const number = Math.abs(49 - event.keyCode)
        const result = results[number]

        if (result) return selectItem(result, event)
      }

      // Lightweight vim-mode: cmd/ctrl + jklo
      switch (event.keyCode) {
        case 74:
          keyActions.arrowDown()
          break
        case 75:
          keyActions.arrowUp()
          break
        case 76:
          keyActions.arrowRight()
          break
        case 79:
          keyActions.select()
          break
      }
    }

    switch (event.keyCode) {
      case 9:
        autocomplete(event)
        break
      case 39:
        keyActions.arrowRight()
        break
      case 40:
        keyActions.arrowDown()
        break
      case 38:
        keyActions.arrowUp()
        break
      case 13:
        keyActions.select()
        break
      case 27:
        actions.reset()
        electronWindow.hide()
        break
    }
  }

  const onMainInputFocus = () => setMainInputFocused(true)
  const onMainInputBlur = () => setMainInputFocused(false)

  const cleanup = () => {
    window.removeEventListener('resize', onWindowResize)
    window.removeEventListener('keydown', onDocumentKeydown)
    window.removeEventListener('beforeunload', cleanup)
    electronWindow.removeListener('show', focusMainInput)
    electronWindow.removeListener('show', () => updateElectronWindow(results, visibleResults))
  }

  /**
   * Get highlighted result
   * @return {Object}
   */
  const highlightedResult = () => results[selected]

  /**
   * Select item from results list
   * @param  {[type]} item [description]
   * @return {[type]}      [description]
   */
  const selectItem = (item, realEvent) => {
    actions.reset()
    const event = wrapEvent(realEvent)
    item.onSelect(event)

    if (!event.defaultPrevented) electronWindow.hide()
  }

  /**
   * Autocomple search term from highlighted result
   */
  const autocomplete = (event) => {
    const { term: highlightedTerm } = highlightedResult()
    if (highlightedTerm && highlightedTerm !== term) {
      actions.updateTerm(highlightedTerm)
      event.preventDefault()
    }
  }

  /**
   * Select highlighted element
   */
  const selectCurrent = (event) => selectItem(highlightedResult(), event)

  const autocompleteValue = () => {
    const selectedResult = highlightedResult()
    if (selectedResult && selectedResult.term) {
      const regexp = new RegExp(`^${escapeStringRegexp(term)}`, 'i')
      if (selectedResult.term.match(regexp)) {
        return selectedResult.term.replace(regexp, term)
      }
    }
    return ''
  }

  return (
    <div className={styles.search}>
      <Autocomplete autocompleteCalculator={autocompleteValue} />
      <div className={styles.inputWrapper}>
        <MainInput
          value={term}
          ref={mainInput}
          onChange={actions.updateTerm}
          onKeyDown={onKeyDown}
          onFocus={onMainInputFocus}
          onBlur={onMainInputBlur}
        />
      </div>
      <ResultsList
        results={results}
        selected={selected}
        visibleResults={visibleResults}
        onItemHover={actions.selectElement}
        onSelect={selectItem}
        mainInputFocused={mainInputFocused}
      />
      {statusBarText && <StatusBar value={statusBarText} />}
    </div>
  )
}

Cerebro.propTypes = {
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
  statusBarText: PropTypes.string,
  prevTerm: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    selected: state.search.selected,
    results: state.search.resultIds.map((id) => state.search.resultsById[id]),
    term: state.search.term,
    statusBarText: state.statusBar.text,
    prevTerm: state.search.prevTerm,
    visibleResults: state.search.visibleResults,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(searchActions, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cerebro)
