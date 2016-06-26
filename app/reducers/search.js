/* eslint no-shadow: [2, { "allow": ["comments"] }] */

import {
  UPDATE_TERM,
  MOVE_CURSOR,
  SHOW_RESULT,
  RESET,
} from '../actions/search';

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
      const { results } = state;
      selected += payload;
      selected = Math.max(Math.min(selected, results.length - 1), 0);
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
