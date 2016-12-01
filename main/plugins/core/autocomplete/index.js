import { search, memoize } from 'cerebro-tools';
import loadExternalPlugins from '../../loadExternalPlugins';

const getPluginsWithKeyword = memoize(() => {
  const plugins = loadExternalPlugins();
  return Object.keys(plugins)
    .map(name => plugins[name])
    .filter(plugin => !!plugin.keyword);
});

/**
 * Plugin for autocomplete other plugins
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const fn = ({term, display, actions}) => {
  let results = search(getPluginsWithKeyword(), term, (plugin) => plugin.keyword)
    .filter(plugin => plugin.keyword !== term);
  results = results.map(res => ({
    title: res.name,
    icon: res.icon,
    term: res.keyword,
    onSelect: (event) => {
      event.preventDefault();
      actions.replaceTerm(res.keyword);
    }
  }));
  display(results);
};

export default {
  fn,
  name: 'Plugins autocomplete',
};
