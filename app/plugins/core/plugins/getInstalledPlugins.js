import { packageJsonPath } from 'lib/plugins'
import { readFileSync } from 'fs'

const readPackageJson = () => readFileSync(packageJsonPath, { encoding: 'utf8' })

/**
 * Get list of all installed plugins with versions
 *
 * @return {Promise<Object>}
 */
export default async () => {
  const packageJson = JSON.parse(readPackageJson())
  return packageJson.dependencies
}
