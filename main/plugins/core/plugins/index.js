import React from 'react'
import Preview from './Preview'
import { search, memoize } from 'cerebro-tools'
import availablePlugins from './getAvailablePlugins'
import installedPlugins from './getInstalledPlugins'

const getAvailablePlugins = memoize(availablePlugins)
const getInstalledPlugins = memoize(() => (
  installedPlugins().then(plugins => Object.keys(plugins))
))

const fn = ({ term, display }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i)
  if (match) {
    const pluginSearch = match[1]
    Promise.all([
      getAvailablePlugins(),
      getInstalledPlugins()
    ]).then(plugins => {
      const [available, installed] = plugins
      let results = search(
        available,
        pluginSearch,
        ({ name, description }) => [name, description].join(' ')
      )
      results = results.map(plugin => ({
        title: `${plugin.name} (${plugin.version})`,
        subtitle: plugin.description,
        getPreview: () => <Preview plugin={plugin} installed={installed.includes(plugin.name)} />
      }))
      display(results)
    })
  }
}

export default {
  fn
}
