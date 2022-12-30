import React from 'react'
import ReactDOM from 'react-dom'
import plugins from 'plugins'
import { on, send } from 'lib/rpc'
import { settings as pluginSettings, modulesDirectory } from 'lib/plugins'

global.React = React
global.ReactDOM = ReactDOM

on('initializePluginAsync', ({ name }) => {
  const { allPlugins } = plugins
  console.group(`Initialize async plugin ${name}`)

  try {
    const plugin = allPlugins[name] || window.require(`${modulesDirectory}/${name}`)
    const { initializeAsync } = plugin

    if (!initializeAsync) {
      console.log('no `initializeAsync` function, skipped')
      return
    }

    console.log('running `initializeAsync`')
    initializeAsync((data) => {
      console.log('Done! Sending data back to main window')
      // Send message back to main window with initialization result
      send('plugin.message', { name, data })
    }, pluginSettings.getUserSettings(plugin, name))
  } catch (err) { console.log('Failed', err) }

  console.groupEnd()
})
