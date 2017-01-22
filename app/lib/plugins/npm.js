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
  rmdir(dir, err => err ? reject(err) : resolve())
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
    console.group('Unarchive', tarPath)
    console.log('Create temp directory', packagePath)
    fs.mkdirSync(packagePath)
    console.log(`Unarchive ${tarPath} to ${packagePath}`)
    return targz().extract(tarPath, packagePath)
      .then(() => removeDir(tarPath))
      .then(() => {
        console.groupEnd()
        return packagePath
      })
      .catch(err => {
        console.log('Error', err)
        console.groupEnd()
      })
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
      console.group('[npm] Install package', name)
      return fetch(`${API_BASE}${name}`)
        .then(response => response.json())
        .then(json => {
          versionToInstall = version || json['dist-tags'].latest
          console.log('Version:', versionToInstall)
          const tar = json.versions[versionToInstall].dist.tarball
          console.log('Found tgz:', tar)
          return fetchTarball(tar)
        })
        .then(body => {
          const tarPath = path.join(dir, `${name}.tgz`)
          const tmpPath = path.join(dir, `${name}-tmp`)
          console.log('Save tgz to', tarPath)
          fs.writeFileSync(tarPath, body)
          return unarchiveTarball(tarPath, tmpPath)
        })
        .then(tmpPath => {
          const oldName = path.join(tmpPath, 'package')
          const newName = path.join(dir, 'node_modules', name)
          console.log(`Rename ${oldName} -> ${newName}`)
          fs.renameSync(oldName, newName)
          console.log('Remove', tmpPath)
          return removeDir(tmpPath)
        })
        .then(() => {
          const json = getConfig()
          json.dependencies[name] = `^${versionToInstall}`
          console.log('Add package to dependencies')
          setConfig(json)
          console.groupEnd()
        })
        .catch(err => {
          console.log('Error in package installation');
          console.log(err)
          console.groupEnd()
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
      console.group('[npm] Uninstall package', name)
      console.log('Remove package directory ', modulePath);
      return removeDir(modulePath)
        .then(() => {
          const json = getConfig()
          console.log('Update package.json');
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
          console.log('Rewrite package.json');
          setConfig(json)
          console.groupEnd()
          return true
        })
        .catch(err => {
          console.log('Error in package uninstallation');
          console.log(err)
          console.groupEnd()
        })
    }
  }
}
