import { packageJsonPath } from 'lib/plugins'
import { readFile } from 'fs/promises'
import PluginsService from 'plugins'

const readPackageJson = async () => {
  try {
    const fileContent = await readFile(packageJsonPath, { encoding: 'utf8' })
    return JSON.parse(fileContent)
  } catch (err) {
    console.log(err)
    return {}
  }
}

/**
 * Get list of all installed plugins with versions
 *
 * @return {Promise<{[name: string]: Record<string, any>}>}
 */
export default async () => {
  const packageJson = await readPackageJson()
  const result = {}
  const externalPlugins = PluginsService.getExternalPlugins()

  Object.keys(externalPlugins).forEach((pluginName) => {
    result[pluginName] = { ...externalPlugins[pluginName], version: packageJson.dependencies[pluginName] || '0.0.0' }
  })

  return result
}
