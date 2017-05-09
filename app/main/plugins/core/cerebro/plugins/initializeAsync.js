import loadPlugins from './loadPlugins'
import { client } from 'lib/plugins'
import { flow, filter, map, property } from 'lodash/fp'

export default function checkForUpdates() {
  console.log('Run plugins autoupdate')
  loadPlugins().then(flow(
    filter(property('isUpdateAvailable')),
    map(plugin => client.update(plugin.name))
  )).then(promises => Promise.all(promises).then(() => promises.length))
    .then((updatedPlugins) => {
      console.log(
        updatedPlugins > 0
          ? `${updatedPlugins} plugins are updated`
          : 'All plugins are up to date'
      )
    })

  // Run autoupdate every 12 hours
  setTimeout(checkForUpdates, 12 * 60 * 60 * 1000)
}
