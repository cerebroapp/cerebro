import React from 'react';

import search from './search';
import getSuggestions from './getSuggestions';
import Preview from './Preview';
import icon from './icon.png';
import styles from './styles.css';


const id = 'search-web';
const order = 11;

const googlePlugin = (term, callback) => {
  let match = term.match(/^g(?:oogle)?\s+(.+)$/);
  match = match || term.match(/^(.+)\s+g(?:oogle)$/);
  if (match) {
    // Show suggestions in results list
    getSuggestions(match[1]).then(suggestions => {
      const result = suggestions.map(s => ({
        icon,
        id: `google-${s}`,
        title: s,
        onSelect: () => search(s),
      }));
      callback(result);
    })
    return;
  }
  // Default fallback with google plugin
  callback({
    id,
    icon,
    order,
    title: `Search web for ${term}`,
    onSelect: () => search(term),
    getPreview: () => {
      return <Preview query={term} key={term} />
    }
  });
};

export default {
  fn: googlePlugin,
};
