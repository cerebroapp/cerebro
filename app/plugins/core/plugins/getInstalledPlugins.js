import { packageJsonPath } from 'lib/plugins'
import { readFile } from 'fs/promises'

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
 * @return {Promise<{[name: string]: string}>}
 */
export default async () => {
  const packageJson = await readPackageJson()
  return packageJson?.dependencies || {}
}
