import debounce from 'lodash/debounce'
import chokidar from 'chokidar'
import path from 'path'
import initPlugin from 'lib/initPlugin'
import { modulesDirectory, ensureFiles, settings } from 'lib/plugins'

const requirePlugin = (pluginPath) => {
  try {
    let plugin = window.require(pluginPath)
    // Fallback for plugins with structure like `{default: {fn: ...}}`
    const keys = Object.keys(plugin)
    if (keys.length === 1 && keys[0] === 'default') {
      plugin = plugin.default
    }
    return plugin
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
  plugin
  // Check existing of main plugin function
  && typeof plugin.fn === 'function'
  // Check that plugin function accepts 0 or 1 argument
  && plugin.fn.length <= 1
)

ensureFiles()

/* As we support scoped plugins, using 'base' as plugin name is no longer valid
  because it is not unique. '@example/plugin' and '@test/plugin' would both be treated as 'plugin'
  So now we must introduce the scope to the plugin name
  This function returns the name with the scope if it is present in the path
*/
const getPluginName = (pluginPath) => {
  const { base, dir } = path.parse(pluginPath)
  const scope = dir.match(/@.+$/)
  if (!scope) return base
  return `${scope[0]}/${base}`
}

const plugins = {}

function setupPluginsWatcher() {
  if (global.isBackground) return

  const pluginsWatcher = chokidar.watch(modulesDirectory, { depth: 1 })
  pluginsWatcher.on('unlinkDir', (pluginPath) => {
    const { base, dir } = path.parse(pluginPath)
    if (base.match(/node_modules/) || base.match(/^@/)) return
    if (!dir.match(/node_modules$/) && !dir.match(/@.+$/)) return

    const pluginName = getPluginName(pluginPath)

    const requirePath = window.require.resolve(pluginPath)
    delete plugins[pluginName]
    delete window.require.cache[requirePath]
    console.log(`[${pluginName}] Plugin removed`)
  })

  pluginsWatcher.on('addDir', (pluginPath) => {
    const { base, dir } = path.parse(pluginPath)

    if (base.match(/node_modules/) || base.match(/^@/)) return
    if (!dir.match(/node_modules$/) && !dir.match(/@.+$/)) return

    const pluginName = getPluginName(pluginPath)

    setTimeout(() => {
      console.group(`Load plugin: ${pluginName}`)
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
      const watcher = chokidar.watch(pluginPath, { depth: 0 })
      watcher.on('change', debounce(() => {
        console.log(`[${pluginName}] Update plugin`)
        delete window.require.cache[requirePath]
        plugins[pluginName] = window.require(pluginPath)
        console.log(`[${pluginName}] Plugin updated`)
      }, 1000))
      plugins[pluginName] = plugin
      initPlugin(plugin, pluginName)
      console.groupEnd()
    }, 1000)
  })
}

setupPluginsWatcher()

export default function getExternalPlugins() {
  return plugins
}
