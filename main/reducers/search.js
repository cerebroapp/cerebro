/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  UPDATE_TERM,
  MOVE_CURSOR,
  SELECT_ELEMENT,
  SHOW_RESULT,
  HIDE_RESULT,
  RESET,
  CHANGE_VISIBLE_RESULTS
} from '../constants/actionTypes'

import { MIN_VISIBLE_RESULTS } from '../constants/ui'

import uniq from 'lodash/uniq'
import orderBy from 'lodash/orderBy'

const initialState = {
  // Search term in main input
  term: '',
  // Store last used term in separate field
  prevTerm: '',
  // Array of ids of results
  resultIds: [],
  resultsById: {},
  // Index of selected result
  selected: 0,
  // Count of visible results
  visibleResults: MIN_VISIBLE_RESULTS
}


/**
 * Normalize index of selected item.
 * Index should be >= 0 and <= results.length
 *
 * @param  {Integer} index
 * @param  {Integer} length current count of found results
 * @return {Integer} normalized index
 */
function normalizeSelection(index, length) {
  const normalizedIndex = index % length
  return normalizedIndex < 0 ? length + normalizedIndex : normalizedIndex
}

// Function that does nothing
const noon = () => {}

function normalizeResult(result) {
  return {
    ...result,
    onFocus: result.onFocus || noon,
    onBlur: result.onFocus || noon,
    onSelect: result.onSelect || noon,
  }
}

export default function search(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TERM: {
      return {
        ...state,
        term: payload,
        resultIds: [],
        selected: 0
      }
    }
    case MOVE_CURSOR: {
      let selected = state.selected
      const resultIds = state.resultIds
      selected += payload
      selected = normalizeSelection(selected, resultIds.length)
      return {
        ...state,
        selected,
      }
    }
    case SELECT_ELEMENT: {
      const selected = normalizeSelection(payload, state.resultIds.length)
      return {
        ...state,
        selected,
      }
    }
    case HIDE_RESULT: {
      const { id } = payload
      let { resultsById, resultIds } = state
      resultIds = resultIds.filter(resultId => resultId !== id)

      resultsById = resultIds.reduce((acc, resultId) => ({
        ...acc,
        [resultId]: resultsById[resultId]
      }), {})

      return {
        ...state,
        resultsById,
        resultIds
      }
    }
    case SHOW_RESULT: {
      const { term, result } = payload
      if (term !== state.term) {
        // Do not show this result if term was changed
        return state
      }
      let { resultsById, resultIds } = state

      result.forEach(res => {
        resultsById = {
          ...resultsById,
          [res.id]: normalizeResult(res)
        }
        resultIds = [...resultIds, res.id]
      })

      return {
        ...state,
        resultsById,
        resultIds: orderBy(uniq(resultIds), id => resultsById[id].order || 0)
      }
    }
    case CHANGE_VISIBLE_RESULTS: {
      return {
        ...state,
        visibleResults: payload,
      }
    }
    case RESET: {
      return {
        // Do not override last used search term with empty string
        ...state,
        prevTerm: state.term || state.prevTerm,
        resultsById: {},
        resultIds: [],
        term: '',
        selected: 0,
      }
    }
    default:
      return state
  }
}
