/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  UPDATE_TERM,
  MOVE_CURSOR,
  SELECT_ELEMENT,
  SHOW_RESULT,
  RESET,
} from '../constants/actionTypes';

import uniq from 'lodash/uniq';

import { MAX_RESULTS } from '../constants/ui';

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
};


/**
 * Normalize index of selected item.
 * Index should be >= 0 and <= results.length
 *
 * @param  {Integer} index
 * @param  {Integer} length current count of found results
 * @return {Integer} normalized index
 */
function normalizeSelection(index, length) {
  const normalizedIndex = index % length;
  return normalizedIndex < 0 ? length + normalizedIndex : normalizedIndex;
}

// Function that does nothing
const noon = () => {};

function normalizeResult(result) {
  return {
    ...result,
    onFocus: result.onFocus || noon,
    onBlur: result.onFocus || noon,
    onSelect: result.onSelect || noon,
  };
}

export default function search(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TERM: {
      return {
        term: payload,
        resultIds: [],
        resultsById: {},
        selected: 0
      };
    }
    case MOVE_CURSOR: {
      let selected = state.selected;
      const resultIds = state.resultIds;
      selected += payload;
      selected = normalizeSelection(selected, resultIds.length);
      return {
        ...state,
        selected,
      };
    }
    case SELECT_ELEMENT: {
      const selected = normalizeSelection(payload, state.resultIds.length);
      return {
        ...state,
        selected,
      };
    }
    case SHOW_RESULT: {
      const { term, result } = payload;
      if (term !== state.term) {
        // Do not show this result if term was changed
        return state;
      }
      const { resultsById, resultIds } = state;

      const newIds = [];

      result.forEach(res => {
        resultsById[res.id] = normalizeResult(res);
        newIds.push(res.id);
      });

      return {
        ...state,
        resultsById,
        resultIds: uniq([...resultIds, ...newIds]).slice(0, MAX_RESULTS),
      };
    }
    case RESET: {
      return {
        // Do not override last used search term with empty string
        prevTerm: state.term || state.prevTerm,
        resultsById: {},
        resultIds: [],
        term: '',
        selected: 0,
      };
    }
    default:
      return state;
  }
}
