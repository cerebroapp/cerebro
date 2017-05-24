import { packageJsonPath } from 'lib/plugins'

const readPackageJson = () => new Promise((resolve, reject) => {
  fs.readFile(packageJsonPath, options, (err, source) => (
    err ? reject(err) : resolve(source)
  ))
})

/**
 * Get list of all installed plugins with versions
 *
 * @return {Promise<Object>}
 */
export default () => (
  readPackageJson()
    .then(JSON.parse)
    .then(json => json.dependencies)
)
