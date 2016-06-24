import React from 'react';
import fuzzySearch from '../lib/fuzzySearch';

import * as plugins from './index';

const keywordPlugins = Object
  .keys(plugins)
  .map(name => plugins[name])
  .filter(plugin => !!plugin.keyword);

/**
 * Plugin for autocomplete other plugins
 * @param  {String} term
 */
const pluginsPlugin = (term, callback) => {
  let results = fuzzySearch(keywordPlugins, term, (plugin) => plugin.keyword);
  results = results.map(res => {
    return {
      title: res.name,
      term: `${res.keyword} `
    }
  });
  callback(term, results);
}

export default {
  name: 'Plugins',
  fn: pluginsPlugin,
}
