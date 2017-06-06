import React from 'react'
import Preview from './Preview'
import { search } from 'cerebro-tools'
import { shell } from 'electron'
import loadPlugins from './loadPlugins'
import icon from '../icon.png'
import * as format from './format'
import { flow, map, partialRight, tap } from 'lodash/fp'
import { partition } from 'lodash'
import initializeAsync from './initializeAsync'
import store from '../../../store'
import * as statusBar from '../../../actions/statusBar'

const toString = ({ name, description }) => [name, description].join(' ')
const categories = [
  ['Updates', plugin => plugin.isUpdateAvailable],
  ['Installed', plugin => plugin.isInstalled],
  ['Available', plugin => plugin.name],
]

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

const pluginToResult = update => plugin => {
  if (typeof plugin === 'string') {
    return { title: plugin }
  }

  return {
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
  }
}

const categorize = (plugins, callback) => {
  const result = []
  let remainder = plugins

  categories.forEach(category => {
    const [title, filter] = category
    const [matched, others] = partition(remainder, filter)
    if (matched.length) result.push(title, ...matched)
    remainder = others
  })

  plugins.splice(0, plugins.length)
  plugins.push(...result)
  callback()
}

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
      tap(plugins => categorize(plugins, () => hide('loading'))),
      map(pluginToResult(update)),
      display
    ))
  }
}

const setStatusBar = (text) => {
  store.dispatch(statusBar.setValue(text))
}

export default {
  icon,
  fn,
  initializeAsync,
  name: 'Manage plugins',
  keyword: 'plugins',
  onMessage: (type) => {
    if (type === 'plugins:start-installation') {
      setStatusBar('Installing default plugins...')
    }
    if (type === 'plugins:finish-installation') {
      setTimeout(() => {
        setStatusBar(null)
      }, 2000)
    }
  }
}
