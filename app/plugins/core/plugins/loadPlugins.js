import { memoize } from 'cerebro-tools'
import validVersion from 'semver/functions/valid'
import compareVersions from 'semver/functions/gt'
import availablePlugins from './getAvailablePlugins'
import getInstalledPlugins from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'
import blacklist from './blacklist'

const maxAge = 5 * 60 * 1000 // 5 minutes

const getAvailablePlugins = memoize(availablePlugins, { maxAge })

const parseVersion = (version) => (
  validVersion((version || '').replace(/^\^/, '')) || '0.0.0'
)

export default async () => {
  const [available, installed, debuggingPlugins] = await Promise.all([
    getAvailablePlugins(),
    getInstalledPlugins(),
    getDebuggingPlugins()
  ])

  const listOfInstalledPlugins = Object.entries(installed).map(([name, version]) => ({
    name,
    version,
    installedVersion: parseVersion(version),
    isInstalled: true,
    isUpdateAvailable: false,
  }))

  const listOfAvailablePlugins = available.map((plugin) => {
    const installedVersion = installed[plugin.name]
    if (!installedVersion) { return plugin }

    const isUpdateAvailable = compareVersions(plugin.version, parseVersion(installedVersion))
    return {
      ...plugin,
      installedVersion,
      isInstalled: true,
      isUpdateAvailable
    }
  })

  console.log('Debugging Plugins: ', debuggingPlugins)

  const listOfDebuggingPlugins = debuggingPlugins.map((name) => ({
    name,
    description: '',
    version: 'dev',
    isDebugging: true
  }))

  const plugins = [
    ...listOfInstalledPlugins,
    ...listOfAvailablePlugins,
    ...listOfDebuggingPlugins
  ].filter((plugin) => !blacklist.includes(plugin.name))

  return plugins
}
