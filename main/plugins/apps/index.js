import React from 'react';
import getAppsList from 'lib/getAppsList';
import search from 'lib/search';
import Preview from './Preview';
import { shell } from 'electron';
import memoize from 'memoizee';

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

const appsPlugin = (term,  callback) => {
  cachedAppsList().then(items => {
    const result = search(items, term, (file) => file.name).map(file => {
      const { path, name } = file;
      return {
        title: name,
        term: name,
        id: path,
        icon: path,
        subtitle: path,
        onKeyDown: (event) => {
          if (event.metaKey && event.keyCode === 82) {
            // Show application in Finder by cmd+R shortcut
            shell.showItemInFolder(path);
            event.preventDefault();
          }
        },
        onSelect: () => shell.openItem(path),
        getPreview: () => <Preview name={name} path={path} />
      };
    });
    callback(result);
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
