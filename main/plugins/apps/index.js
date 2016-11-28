import React from 'react';
import Preview from './Preview';
import memoize from 'memoizee';
import orderBy from 'lodash/orderBy';

import getAppsList from './lib/getAppsList';
import search from 'lib/search';

/**
 * Time for apps list cache
 * @type {Integer}
 */
const CACHE_TIME = 2 * 60 * 1000;

/**
 * Cache getAppsList function
 * @type {Function}
 */
const cachedAppsList = memoize(getAppsList, {
  length: false,
  promise: 'then',
  maxAge: CACHE_TIME,
  preFetch: true
});

const appsPlugin = ({term, actions, display}) => {
  cachedAppsList().then(items => {
    const result = orderBy(
      search(items, term, (file) => file.name),
      [
        ({useCount}) => useCount ? parseInt(useCount, 10) : 0,
        ({lastUsed}) => lastUsed ? lastUsed : '0000',
      ],
      ['desc', 'desc']
    ).map(file => {
      const { path, name } = file;
      return {
        title: name,
        term: name,
        icon: path,
        subtitle: path,
        onKeyDown: (event) => {
          if (event.metaKey && event.keyCode === 82) {
            // Show application in Finder by cmd+R shortcut
            actions.reveal(path);
            event.preventDefault();
          }
        },
        onSelect: () => actions.open(`file://${path}`),
        getPreview: () => <Preview name={name} path={path} />
      };
    });
    display(result);
  });
};

export default {
  fn: appsPlugin,
  initialize: () => {
    // Cache apps cache and force cache reloading in background
    const recache = () => {
      cachedAppsList();
      setTimeout(recache, CACHE_TIME * 0.75);
    }
    recache();
  }
};
