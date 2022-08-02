import { memoize } from 'cerebro-tools'
import validVersion from 'semver/functions/valid'
import compareVersions from 'semver/functions/gt'
import availablePlugins from './getAvailablePlugins'
import getInstalledPlugins from './getInstalledPlugins'
import getDebuggingPlugins from './getDebuggingPlugins'

const maxAge = 5 * 60 * 1000 // 5 minutes

const getAvailablePlugins = memoize(availablePlugins, { maxAge })

const parseVersion = (version) => (
  validVersion((version || '').replace(/^\^/, '')) || '0.0.0'
)

export default async () => {
  const resultPlugins = []

  const [available, installed, debuggingPlugins] = await Promise.all([
    getAvailablePlugins(),
    getInstalledPlugins(),
    getDebuggingPlugins()
  ])

  installed.forEach(([name, version]) => {
    resultPlugins.push({
      name,
      version,
      installedVersion: parseVersion(version),
      isInstalled: true,
      isUpdateAvailable: false,
    })
  })

  available.forEach((plugin) => {
    const installedPluginIndex = resultPlugins.findIndex(({ name }) => name === plugin.name)
    if (installedPluginIndex === -1) {
      return resultPlugins.push(plugin)
    }

    const installedPlugin = resultPlugins[installedPluginIndex]
    const { installedVersion } = installedPlugin
    const isUpdateAvailable = compareVersions(plugin.version, installedVersion)

    resultPlugins[installedPluginIndex] = {
      ...installedPlugin,
      ...plugin,
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

  return [
    ...resultPlugins,
    ...listOfDebuggingPlugins
  ]
}
