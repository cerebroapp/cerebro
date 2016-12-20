import { shellCommand } from 'cerebro-tools'
import fs from 'fs'

/**
 * Base url of npm API
 *
 * @type {String}
 */
const API_BASE = 'http://registry.npmjs.org/'

/**
 * Download .tgz file for npm package
 *
 * @param  {String} path Url for package .tgz file
 * @return {Promise<Buffer>}
 */
const fetchTarball = (path) => (
  fetch(path)
    .then(response => response.arrayBuffer())
    .then(content => new Buffer(content))
)

/**
 * Unarchive downloaded tar archive
 *
 * @param  {String} tarPath
 * @param  {String} packagePath
 * @return {Promise<String>}
 */
const unarchiveTarball = (tarPath, packagePath) => {
  const prepare = fs.existsSync(packagePath) ?
    shellCommand(`rm -rf "${packagePath}"`) :
    Promise.resolve()
  return prepare.then(() => {
    fs.mkdirSync(packagePath)
    return shellCommand(`tar zxvf "${tarPath}" -C "${packagePath}"`)
      .then(() => shellCommand(`rm -rf "${tarPath}"`))
      .then(() => packagePath)
  })
}

/**
 * Lightweight npm client.
 * It only can install/uninstall package, without resolving dependencies
 *
 * @param  {String} path Path to npm package directory
 * @return {Object}
 */
export default (path) => {
  const packageJson = `${path}/package.json`
  const setConfig = (config) => (
    fs.writeFileSync(packageJson, JSON.stringify(config))
  )
  const getConfig = () => JSON.parse(fs.readFileSync(packageJson))
  return {
    /**
     * Install npm package
     *
     * @param  {String} name Name of package in npm registry
     * @param  {String} @version [version] Version of npm package. Default is latest version
     * @return {Promise}
     */
    install(name, version = null) {
      let versionToInstall
      return fetch(`${API_BASE}${name}`)
        .then(response => response.json())
        .then(json => {
          versionToInstall = version || json['dist-tags'].latest
          const tar = json.versions[versionToInstall].dist.tarball
          return fetchTarball(tar)
        })
        .then(body => {
          const tarPath = `${path}/${name}.tgz`
          const tmpPath = `${path}/${name}-tmp`
          fs.writeFileSync(tarPath, body)
          return unarchiveTarball(tarPath, tmpPath)
        })
        .then((tmpPath) => {
          fs.renameSync(`${tmpPath}/package`, `${path}/node_modules/${name}`)
          return shellCommand(`rm -rf "${tmpPath}"`)
        })
        .then(() => {
          const json = getConfig()
          json.dependencies[name] = `^${versionToInstall}`
          setConfig(json)
        })
    },
    /**
     * Uninstall npm package
     *
     * @param  {String} name
     * @return {Promise}
     */
    uninstall(name) {
      return shellCommand(`rm -rf "${path}/node_modules/${name}"`)
        .then(() => {
          const json = getConfig()
          json.dependencies = Object
            .keys(json.dependencies || {})
            .reduce((acc, key) => {
              if (key !== name) {
                return {
                  ...acc,
                  [key]: json.dependencies[key]
                }
              }
              return acc
            }, {})
          setConfig(json)
          return true
        })
    }
  }
}
