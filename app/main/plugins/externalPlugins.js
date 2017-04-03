import debounce from 'lodash/debounce'
import chokidar from 'chokidar'
import path from 'path'
import { modulesDirectory, ensureFiles, settings } from 'lib/plugins'

const requirePlugin = (pluginPath) => {
  try {
    return window.require(pluginPath)
  } catch (error) {
    // catch all errors from plugin loading
    console.log('Error requiring', pluginPath)
    console.log(error)
  }
}

/**
 * Validate plugin module signature
 *
 * @param  {Object} plugin
 * @return {Boolean}
 */
const isPluginValid = (plugin) => (
  plugin &&
    // Check existing of main plugin function
    typeof plugin.fn === 'function' &&
    // Check that plugin function accepts 0 or 1 argument
    plugin.fn.length <= 1
)

ensureFiles()

const plugins = {}

const pluginsWatcher = chokidar.watch(modulesDirectory, { depth: 0 })

pluginsWatcher.on('unlinkDir', (pluginPath) => {
  const name = path.parse(pluginPath).base
  const requirePath = window.require.resolve(pluginPath)
  console.log(`[${name}] Plugin removed`)
  delete window.require.cache[requirePath]
  delete plugins[name]
})

pluginsWatcher.on('addDir', (pluginPath) => {
  const { base, dir } = path.parse(pluginPath)
  if (dir !== modulesDirectory) {
    return
  }
  setTimeout(() => {
    console.group(`Load plugin: ${base}`)
    console.log(`Path: ${pluginPath}...`)
    const plugin = requirePlugin(pluginPath)
    if (!isPluginValid(plugin)) {
      console.log('Plugin is not valid, skipped')
      console.groupEnd()
      return
    }
    if (!settings.validate(plugin)) {
      console.log('Invalid plugins settings')
      console.groupEnd()
      return
    }

    console.log('Loaded.')
    const requirePath = window.require.resolve(pluginPath)
    const watcher = chokidar.watch(requirePath, { depth: 0 })
    watcher.on('change', debounce(() => {
      console.log(`[${base}] Update plugin`)
      delete window.require.cache[requirePath]
      plugins[base] = window.require(pluginPath)
      settings.add(base, plugins[base])
      console.log(`[${base}] Plugin updated`)
    }, 1000))
    console.groupEnd()
    plugins[base] = plugin
  }, 1000)
})

export default plugins
