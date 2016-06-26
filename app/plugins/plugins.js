import search from '../lib/search';

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
  let results = search(keywordPlugins, term, (plugin) => plugin.keyword);
  results = results.map(res => ({
    title: res.name,
    term: `${res.keyword} `
  }));
  callback(term, results);
};

export default {
  name: 'Plugins',
  fn: pluginsPlugin,
};
