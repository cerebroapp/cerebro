import { memoize } from 'cerebro-tools'
import validVersion from 'semver/functions/valid'
import compareVersions from 'semver/functions/gt'
import availablePlugins from './getAvailablePlugins'
import getInstalledPlugins from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'

const maxAge = 5 * 60 * 1000 // 5 minutes

const getAvailablePlugins = memoize(availablePlugins, { maxAge })

const parseVersion = version => (
  validVersion((version || '').replace(/^\^/, '')) || '0.0.0'
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
    const isUpdateAvailable = isInstalled && compareVersions(plugin.version, installedVersion)
    return {
      ...plugin,
      installedVersion,
      isInstalled,
      isUpdateAvailable
    }
  })
  console.log('Debugging Plugins: ', debuggingPlugins)

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
