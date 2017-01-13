import { search, memoize } from 'cerebro-tools'
import plugins from '../../index'

const getPluginsWithKeyword = memoize(() => (
  Object.keys(plugins)
    .map(name => plugins[name])
    .filter(plugin => !!plugin && !!plugin.keyword)
))

const toString = plugin => plugin.keyword
const notMatch = term => plugin => (
  plugin.keyword !== term && `${plugin.keyword} ` !== term
)

/**
 * Plugin for autocomplete other plugins
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const fn = ({ term, display, actions }) => {
  const results = search(getPluginsWithKeyword(), term, toString)
    .filter(notMatch(term))
    .map(res => ({
      title: res.name,
      icon: res.icon,
      term: `${res.keyword} `,
      onSelect: (event) => {
        event.preventDefault()
        actions.replaceTerm(`${res.keyword} `)
      }
    }))
  display(results)
}

export default {
  fn,
  name: 'Plugins autocomplete',
}
