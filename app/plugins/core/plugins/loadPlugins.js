import { memoize } from 'cerebro-tools'
import semver from 'semver'
import availablePlugins from './getAvailablePlugins'
import getInstalledPlugins from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'

const maxAge = 5 * 60 * 1000 // 5 minutes

const getAvailablePlugins = memoize(availablePlugins, { maxAge })

const parseVersion = version => (
  semver.valid((version || '').replace(/^\^/, '')) || '0.0.0'
)

export default async () => {
  const [available, installed, debuggingPlugins] = await Promise.all([
    getAvailablePlugins(),
    getInstalledPlugins(),
    getDebuggingPlugins()
  ])

  const listOfAvailablePlugins = available.map((plugin) => {
    const installedVersion = parseVersion(installed[plugin.name])
    const isInstalled = !!installed[plugin.name]
    const isUpdateAvailable = isInstalled && semver.gt(plugin.version, installedVersion)
    return {
      ...plugin,
      installedVersion,
      isInstalled,
      isUpdateAvailable
    }
  })
  console.log(debuggingPlugins)

  const listOfDebuggingPlugins = debuggingPlugins.map(name => ({
    name,
    description: '',
    version: 'dev',
    isInstalled: false,
    isUpdateAvailable: false,
    isDebugging: true
  }))

  return [
    ...listOfAvailablePlugins,
    ...listOfDebuggingPlugins
  ]
}
