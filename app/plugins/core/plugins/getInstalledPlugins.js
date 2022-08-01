import { packageJsonPath } from 'lib/plugins'
import { readFileSync } from 'fs'

const readPackageJson = () => readFileSync(packageJsonPath, { encoding: 'utf8' })

/**
 * Get list of all installed plugins with versions
 *
 * @return {Promise<[name: string, version: string][]>}
 */
export default async () => {
  const packageJson = JSON.parse(readPackageJson())
  return Object.entries(packageJson.dependencies)
}
