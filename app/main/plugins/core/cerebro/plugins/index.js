import React from 'react'
import Preview from './Preview'
import { search, memoize } from 'cerebro-tools'
import { shell } from 'electron'
import loadPlugins from './loadPlugins'
import icon from '../icon.png'
import * as format from './format'
import { flow, map, partialRight, tap } from 'lodash/fp'
import initializeAsync from './initializeAsync'

const toString = ({ name, description }) => [name, description].join(' ')

const pluginToResult = plugin => {
  const displayVersion = plugin.isUpdateAvailable ?
    `${plugin.installedVersion} → ${plugin.version}` :
    plugin.version
  return {
    icon,
    title: `${format.name(plugin.name)} (${displayVersion})`,
    subtitle: format.description(plugin.description),
    onSelect: () => shell.openExternal(plugin.repo),
    getPreview: () => (
      <Preview
        {...plugin}
        installedVersion={plugin.installedVersion}
        isInstalled={plugin.isInstalled}
        isUpdateAvailable={plugin.isUpdateAvailable}
      />
    )
  }
}

const fn = ({ term, display, hide, actions }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i)
  if (match) {
    const pluginSearch = match[1]
    display({
      icon,
      id: 'loading',
      title: 'Looking for plugins...'
    })
    loadPlugins().then(flow(
      partialRight(search, [pluginSearch, toString]),
      map(pluginToResult),
      tap(() => hide('loading')),
      display
    ))
  }
}

export default {
  icon,
  fn,
  initializeAsync,
  name: 'Manage plugins',
  keyword: 'plugins'
}
