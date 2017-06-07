import { memoize } from 'cerebro-tools'
import availablePlugins from './getAvailablePlugins'
import getInstalledPlugins from './getInstalledPlugins'
import semver from 'semver'

const maxAge = 5 * 60 * 1000

const getAvailablePlugins = memoize(availablePlugins, { maxAge })

const parseVersion = (version) => (
  semver.valid((version || '').replace(/^\^/, '')) || '0.0.0'
)

export default () => (
  Promise.all([
    getAvailablePlugins(),
    getInstalledPlugins()
  ]).then(([available, installed]) => available.map(plugin => {
    const installedVersion = parseVersion(installed[plugin.name])
    const isInstalled = !!installed[plugin.name]
    const isUpdateAvailable = isInstalled && semver.gt(plugin.version, installedVersion)
    return {
      ...plugin,
      installedVersion,
      isInstalled,
      isUpdateAvailable
    }
  }))
)
