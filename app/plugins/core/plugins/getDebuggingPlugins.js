import path from 'path'
import { modulesDirectory } from 'lib/plugins'
import { lstatSync, readdirSync } from 'fs'

const isSymlink = (file) => lstatSync(path.join(modulesDirectory, file)).isSymbolicLink()

/**
 * Get list of all plugins that are currently in debugging mode.
 * These plugins are symlinked by [create-cerebro-plugin](https://github.com/cerebroapp/create-cerebro-plugin)
 *
 * @return {Promise<string[]>}
 */
export default async () => {
  const files = readdirSync(modulesDirectory)
  return files.filter(isSymlink)
}
