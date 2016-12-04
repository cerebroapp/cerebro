import readFile from 'lib/readFile';
import { packageJsonPath } from 'lib/plugins';

/**
 * Get list of all installed plugins with versions
 *
 * @return {Promise<Object>}
 */
export default () => {
  return readFile(packageJsonPath)
    .then(JSON.parse)
    .then(json => json.dependencies)
}
