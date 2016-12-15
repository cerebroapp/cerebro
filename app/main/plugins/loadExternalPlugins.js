import fs from 'fs'
import path from 'path'
import { memoize } from 'cerebro-tools'
import { modulesDirectory, ensureFiles } from 'lib/plugins'

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

export default memoize(() => {
  ensureFiles()

  const files = fs.readdirSync(modulesDirectory)
  return files.reduce((acc, file) => {
    const pluginPath = path.join(modulesDirectory, file)
    const isDir = fs.statSync(pluginPath).isDirectory()
    if (isDir) {
      console.group('Load plugin', file)
      try {
        console.log(`Path: ${pluginPath}...`)
        const plugin = window.require(pluginPath)
        if (isPluginValid(plugin)) {
          console.log('Loaded.')
          console.groupEnd()
          return {
            ...acc,
            [file]: plugin
          }
        }
        console.log('Plugin is not valid, skipped')
      } catch (error) {
        // catch all errors from plugin loading
        console.log('Error loading')
        console.log(error)
      }
      console.groupEnd()
    }
    return acc
  }, {})
})
