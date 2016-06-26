/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  UPDATE_TERM,
  MOVE_CURSOR,
  SELECT_ELEMENT,
  SHOW_RESULT,
  RESET,
} from '../constants/actionTypes';

const initialState = {
  // Search term in main input
  term: '',
  // Store last used term in separate field
  prevTerm: '',
  // Array of found results
  results: [],
  // Index of selected result
  selected: 0,
};


/**
 * Normalize index of selected item.
 * Index should be >= 0 and <= results.length
 *
 * @param  {Integer} index
 * @param  {Array} results results array
 * @return {Integer} normalized index
 */
function normalizeSelection(index, results) {
  const normalizedIndex = index % results.length;
  return normalizedIndex < 0 ? results.length + normalizedIndex : normalizedIndex;
}

export default function search(state = initialState, { type, payload }) {
  switch (type) {
    case UPDATE_TERM: {
      return {
        term: payload,
        results: [],
        selected: 0
      };
    }
    case MOVE_CURSOR: {
      let { selected } = state;
      selected += payload;
      selected = normalizeSelection(selected, state.results);
      return {
        ...state,
        selected,
      };
    }
    case SELECT_ELEMENT: {
      const selected = normalizeSelection(payload, state.results);
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
      let { results } = state;
      if (results.length >= 10) {
        return;
      }

      results = [...results, ...result].slice(0, 10);
      return {
        ...state,
        results,
      };
    }
    case RESET: {
      return {
        // Do not override last used search term with empty string
        prevTerm: state.term || state.prevTerm,
        results: [],
        term: '',
        selected: 0,
      };
    }
    default:
      return state;
  }
}
