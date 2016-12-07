import React from 'react'
import Preview from './Preview'
import { search, memoize } from 'cerebro-tools'
import availablePlugins from './getAvailablePlugins'
import installedPlugins from './getInstalledPlugins'

// Show cerebro icon for plugins result
const icon = '/Applications/Cerebro.app'

const getAvailablePlugins = memoize(availablePlugins)
const getInstalledPlugins = memoize(() => (
  installedPlugins().then(plugins => Object.keys(plugins))
))

const toString = ({ name, description }) => [name, description].join(' ')

const fn = ({ term, display, hide, actions }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i)
  if (match) {
    const pluginSearch = match[1]
    display({
      icon,
      id: 'loading',
      title: 'Looking for plugins...'
    })
    Promise.all([
      getAvailablePlugins(),
      getInstalledPlugins()
    ]).then(plugins => {
      const [available, installed] = plugins
      let results = search(available, pluginSearch, toString)
      results = results.map(plugin => ({
        icon,
        title: `${plugin.name} (${plugin.version})`,
        subtitle: plugin.description,
        onSelect: () => actions.open(plugin.repo),
        getPreview: () => <Preview {...plugin} installed={installed.includes(plugin.name)} />
      }))
      hide('loading')
      display(results)
    })
  }
}

export default {
  icon,
  fn,
  name: 'Manage plugins',
  keyword: 'plugins'
}
