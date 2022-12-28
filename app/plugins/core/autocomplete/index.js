import { search } from 'cerebro-tools'
import {
  flow, filter, map, partialRight, values
} from 'lodash/fp'
import getExternalPlugins from 'plugins/externalPlugins'
import quit from 'plugins/core/quit'
import plugins from 'plugins/core/plugins'
import settings from 'plugins/core/settings'
import version from 'plugins/core/version'
import reload from 'plugins/core/reload'

const allPlugins = {
  quit, plugins, settings, version, reload, ...getExternalPlugins()
}

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
)(allPlugins)

export default { fn, name: 'Plugins autocomplete' }
