import React from 'react';
import Preview from './Preview';

const API_KEY = 'dc6zaTOxFJmzC';

/**
 * Plugin to look and display local and external IPs
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const gifPlugin = ({term, display}) => {
  let match = term.match(/^gif\s+(.+)/i);
  match = match || term.match(/(.+)\sgif$/i);
  if (match) {
    const url = `http://api.giphy.com/v1/gifs/search?q=${encodeURIComponent(match[1])}&api_key=${API_KEY}`;
    fetch(url)
      .then(resp => resp.json())
      .then(results => {
        const response = results.data.map(item => {
          return {
            id: item.id,
            title: item.images.original.url,
            clipboard: item.images.original.url,
            getPreview: () => <Preview images={item.images} id={item.id}  />
          }
        });
        display(response);
      })
  }
};


export default {
  name: 'Search gif',
  keyword: 'gif',
  fn: gifPlugin,
};
