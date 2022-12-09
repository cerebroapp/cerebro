import { search } from 'cerebro-tools'
import {
  flow, filter, map, partialRight, values
} from 'lodash/fp'
import PluginsService from 'plugins'

const toString = (plugin) => plugin.keyword
const notMatch = (term) => (plugin) => (
  plugin.keyword !== term && `${plugin.keyword} ` !== term
)

const pluginToResult = (actions) => (res) => ({
  title: res.name,
  icon: res.icon,
  term: `${res.keyword} `,
  onSelect: (event) => {
    event.preventDefault()
    actions.replaceTerm(`${res.keyword} `)
  }
})

/**
 * Plugin for autocomplete other plugins
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const fn = ({ term, display, actions }) => flow(
  values,
  filter((plugin) => !!plugin.keyword),
  partialRight(search, [term, toString]),
  filter(notMatch(term)),
  map(pluginToResult(actions)),
  display
)(PluginsService.getAllPlugins())

export default { fn, name: 'Plugins autocomplete' }
