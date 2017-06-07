import loadPlugins from './loadPlugins'
import getInstalledPlugins from './getInstalledPlugins'
import { client } from 'lib/plugins'
import config from 'lib/config'
import { flow, filter, map, property } from 'lodash/fp'

const DEFAULT_PLUGINS = [
  process.platform === 'darwin' ? 'cerebro-mac-apps' : 'cerebro-basic-apps',
  'cerebro-google',
  'cerebro-math',
  'cerebro-converter',
  'cerebro-open-web',
  'cerebro-files-nav'
]

/**
 * Check plugins for updates and start plugins autoupdater
 */
function checkForUpdates() {
  console.log('Run plugins autoupdate')
  loadPlugins().then(flow(
    filter(property('isUpdateAvailable')),
    map(plugin => client.update(plugin.name))
  )).then(promises => Promise.all(promises).then(() => promises.length))
    .then(updatedPlugins => {
      console.log(
        updatedPlugins > 0
          ? `${updatedPlugins} plugins are updated`
          : 'All plugins are up to date'
      )
    })

  // Run autoupdate every 12 hours
  setTimeout(checkForUpdates, 12 * 60 * 60 * 1000)
}

/**
 * Migrate plugins: default plugins were extracted to separate packages
 * so if default plugins are not installed – start installation
 */
function migratePlugins(sendMessage) {
  if (config.get('isMigratedPlugins')) {
    // Plugins are already migrated
    return
  }

  console.log('Start installation of default plugins')

  getInstalledPlugins().then(installedPlugins => {
    const promises = flow(
      filter(plugin => !installedPlugins[plugin]),
      map(plugin => client.install(plugin))
    )(DEFAULT_PLUGINS)

    if (promises.length > 0) {
      sendMessage('plugins:start-installation')
    }

    Promise.all(promises).then(() => {
      console.log('All default plugins are installed!')
      config.set('isMigratedPlugins', true)
      sendMessage('plugins:finish-installation')
    })
  })
}

export default (sendMessage) => {
  checkForUpdates()
  migratePlugins(sendMessage)
}
