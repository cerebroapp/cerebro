import React from 'react';

import getSuggestions from './getSuggestions';
import Preview from './Preview';
import icon from './icon.png';
import styles from './styles.css';


const id = 'search-web';
const order = 11;

/**
 * Search term in google
 *
 * @param  {String} options.term
 * @param  {Object} options.actions
 * @param  {Function} options.display
 */
const googlePlugin = ({term, actions, display}) => {
  /**
   * Open browser with google search of term
   * @param  {String} searchTerm
   */
  const search = (searchTerm) => {
    const q = encodeURIComponent(searchTerm);
    actions.open(`https://google.com/?q=${q}#newwindow=1&q=${q}`);
  }

  display({
    id,
    icon,
    order,
    title: `Search web for ${term}`,
    onSelect: () => search(term),
    getPreview: () => {
      return <Preview query={term} key={term} search={search} />
    }
  });
};

export default {
  fn: googlePlugin,
};
