import React from 'react'
import Preview from './Preview'
import { search, memoize } from 'cerebro-tools'
import availablePlugins from './getAvailablePlugins'
import installedPlugins from './getInstalledPlugins'
import icon from '../icon.png'
import semver from 'semver'
import * as format from './format'

const getAvailablePlugins = memoize(availablePlugins)
const getInstalledPlugins = memoize(installedPlugins)

const toString = ({ name, description }) => [name, description].join(' ')

const parseVersion = (version) => (
  semver.valid((version || '').replace(/^\^/, '')) || '0.0.0'
)

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
      const results = search(available, pluginSearch, toString).map(plugin => {
        const installedVersion = parseVersion(installed[plugin.name])
        const isInstalled = !!installed[plugin.name]
        const isUpdateAvailable = isInstalled && semver.gt(plugin.version, installedVersion)
        const displayVersion = isUpdateAvailable ?
          `${installedVersion} → ${plugin.version}` :
          plugin.version
        return {
          icon,
          title: `${format.name(plugin.name)} (${displayVersion})`,
          subtitle: format.description(plugin.description),
          onSelect: () => actions.open(plugin.repo),
          getPreview: () => (
            <Preview
              {...plugin}
              installedVersion={installedVersion}
              isInstalled={isInstalled}
              isUpdateAvailable={isUpdateAvailable}
            />
          )
        }
      })
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
