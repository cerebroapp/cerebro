import fs from 'fs'
import rmdir from 'rmdir'
import path from 'path'
import targz from 'tar.gz'

/**
 * Promise-wrapper for rmdir
 * @param  {String} dir
 * @return {Promise}
 */
const removeDir = (dir) => new Promise((resolve, reject) => {
  rmdir(dir, err => err ? reject() : resolve())
})

/**
 * Promise-wrapper for tar.Extract
 * @param  {String} tarPath
 * @param  {String} dest
 * @return {Promise}
 */
const untar = (tarPath, dest) => new Promise((resolve, reject) => {
  targz().extract(tarPath, dest, err => err ? reject() : resolve())
})

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
const fetchTarball = (tarBall) => (
  fetch(tarBall)
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
    removeDir(packagePath) :
    Promise.resolve()
  return prepare.then(() => {
    fs.mkdirSync(packagePath)
    return untar(tarPath, packagePath)
      .then(() => removeDir(tarPath))
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
export default (dir) => {
  const packageJson = path.join(dir, 'package.json')
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
          const tarPath = path.join(dir, `${name}.tgz`)
          const tmpPath = path.join(dir, `${name}-tmp`)
          fs.writeFileSync(tarPath, body)
          return unarchiveTarball(tarPath, tmpPath)
        })
        .then((tmpPath) => {
          fs.renameSync(path.join(tmpPath, 'package'), path.join(dir, 'node_modules', name))
          return removeDir(tmpPath)
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
      const modulePath = path.join(dir, 'node_modules', name)
      return removeDir(modulePath)
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
