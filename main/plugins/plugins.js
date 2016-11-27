import search from 'lib/search';

import plugins from './index';

const keywordPlugins = Object
  .keys(plugins)
  .map(name => plugins[name])
  .filter(plugin => !!plugin.keyword);

/**
 * Plugin for autocomplete other plugins
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const pluginsPlugin = ({term, display}) => {
  let results = search(keywordPlugins, term, (plugin) => plugin.keyword)
    .filter(plugin => plugin.keyword !== term);
  results = results.map(res => ({
    title: res.name,
    icon: res.icon,
    term: `${res.keyword}`,
  }));
  display(results);
};

export default {
  name: 'Plugins',
  fn: pluginsPlugin,
};
