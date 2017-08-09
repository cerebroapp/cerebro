import path from 'path'
import { modulesDirectory } from 'lib/plugins'
import { readdir, lstatSync } from 'fs'

const isSymlink = file => lstatSync(path.join(modulesDirectory, file)).isSymbolicLink()

/* Get list of all plugins that are currently in debugging mode.
 * These plugins are symlinked by [create-cerebro-plugin](https://github.com/KELiON/create-cerebro-plugin)
 *
 * @return {Promise<Object>}
 */
export default () => new Promise((resolve, reject) => {
  readdir(modulesDirectory, (err, files) => {
    if (err) {
      return reject(err)
    }
    resolve(files.filter(isSymlink))
  })
})
