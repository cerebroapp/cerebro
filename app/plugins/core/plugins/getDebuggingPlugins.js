import path from 'path'
import { modulesDirectory } from 'lib/plugins'
import { lstatSync, readdirSync } from 'fs'

const isSymlink = (file) => lstatSync(path.join(modulesDirectory, file)).isSymbolicLink()
const isScopeDir = (file) => file.match(/^@/) && lstatSync(path.join(modulesDirectory, file)).isDirectory()

const getSymlinkedPluginsInFolder = (scope) => {
  const files = scope
    ? readdirSync(path.join(modulesDirectory, scope))
    : readdirSync(modulesDirectory)
  return files.filter((name) => isSymlink(scope ? path.join(scope, name) : name))
}

const getNotScopedPluginNames = async () => getSymlinkedPluginsInFolder()

const getScopedPluginNames = async () => {
  // Get all scoped folders
  const scopeSubfolders = readdirSync(modulesDirectory).filter(isScopeDir)

  // for each scope, get all plugins
  const scopeNames = scopeSubfolders.map((scope) => {
    console.log('scopes', scope)
    const scopePlugins = getSymlinkedPluginsInFolder(scope)
    return scopePlugins.map((plugin) => `${scope}/${plugin}`)
  }).flat() // flatten array of arrays

  return scopeNames
}

/**
 * Get list of all plugins that are currently in debugging mode.
 * These plugins are symlinked by [create-cerebro-plugin](https://github.com/cerebroapp/create-cerebro-plugin)
 *
 * @return {Promise<String[]>}
 */
export default async () => {
  const [notScoppedPluginNames, scopedPluginNames] = await Promise.all([
    getNotScopedPluginNames(),
    getScopedPluginNames()
  ])
  return [...notScoppedPluginNames, ...scopedPluginNames]
}
