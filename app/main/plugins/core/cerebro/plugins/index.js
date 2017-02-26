import React from 'react'
import Preview from './Preview'
import { search } from 'cerebro-tools'
import { shell } from 'electron'
import loadPlugins from './loadPlugins'
import icon from '../icon.png'
import * as format from './format'
import { flow, map, partialRight, tap } from 'lodash/fp'
import initializeAsync from './initializeAsync'

const toString = ({ name, description }) => [name, description].join(' ')

const updatePlugin = (update, name) => {
  loadPlugins().then(plugins => {
    const updatedPlugin = plugins.find(plugin => plugin.name === name)
    update(name, {
      title: `${format.name(updatedPlugin.name)} (${format.version(updatedPlugin)})`,
      getPreview: () => (
        <Preview
          {...updatedPlugin}
          key={Math.random()}
          onComplete={() => updatePlugin(update, name)}
        />
      )
    })
  })
}

const pluginToResult = update => plugin => ({
  icon,
  id: plugin.name,
  title: `${format.name(plugin.name)} (${format.version(plugin)})`,
  subtitle: format.description(plugin.description),
  onSelect: () => shell.openExternal(plugin.repo),
  getPreview: () => (
    <Preview
      {...plugin}
      key={plugin.name}
      onComplete={() => updatePlugin(update, plugin.name)}
    />
  )
})

const fn = ({ term, display, hide, update }) => {
  const match = term.match(/^plugins?\s*(.+)?$/i)
  if (match) {
    display({
      icon,
      id: 'loading',
      title: 'Looking for plugins...'
    })
    loadPlugins().then(flow(
      partialRight(search, [match[1], toString]),
      map(pluginToResult(update)),
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
