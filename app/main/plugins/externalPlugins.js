import chokidar from 'chokidar'
import path from 'path'
import { modulesDirectory, ensureFiles } from 'lib/plugins'

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
  const file = path.parse(pluginPath).base
  const requirePath = window.require.resolve(pluginPath)
  console.log(`[${file}] Plugin removed`)
  delete window.require.cache[requirePath]
  delete plugins[file]
})

pluginsWatcher.on('addDir', (pluginPath) => {
  const file = path.parse(pluginPath).base
  console.group(`Load plugin: ${file}`)
  console.log(`Path: ${pluginPath}...`)
  const plugin = requirePlugin(pluginPath)
  if (!isPluginValid(plugin)) {
    console.log('Plugin is not valid, skipped')
    console.groupEnd()
    return
  }
  console.log('Loaded.')
  const requirePath = window.require.resolve(pluginPath)
  const watcher = chokidar.watch(requirePath, { depth: 0 })
  watcher.on('change', () => {
    console.log(`[${file}] Update plugin`)
    delete window.require.cache[requirePath]
    plugins[file] = window.require(pluginPath)
    console.log(`[${file}] Plugin updated`)
  })
  console.groupEnd()
  plugins[file] = plugin
})

export default plugins
