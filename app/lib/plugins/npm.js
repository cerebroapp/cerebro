import fs from 'fs'
import os from 'os'
import rimraf from 'rimraf'
import path from 'path'
import tar from 'tar-fs'
import zlib from 'zlib'
import https from 'https'
import mv from 'mv'

const removeDir = dir => rimraf.sync(dir)

/**
 * Base url of npm API
 *
 * @type {String}
 */
const API_BASE = 'http://registry.npmjs.org/'

/**
 * Format name of file from package archive.
 * Just remove `./package`prefix from name
 *
 * @param  {Object} header
 * @return {Object}
 */
const formatPackageFile = header => ({
  ...header,
  name: header.name.replace(/^package\//, '')
})

const installPackage = (tarPath, destination, middleware) => {
  console.log(`Extract ${tarPath} to ${destination}`)

  return new Promise((resolve, reject) => {
    const packageName = path.parse(destination).name
    const tempPath = path.join(os.tmpdir(), packageName)
    console.log(`Download and extract to temp path: ${tempPath}`)
    https.get(tarPath, (stream) => {
      const result = stream
        // eslint-disable-next-line new-cap
        .pipe(zlib.Unzip())
        .pipe(tar.extract(tempPath, {
          map: formatPackageFile
        }))
      result.on('error', reject)
      result.on('finish', () => {
        middleware().then(() => {
          console.log(`Move ${tempPath} to ${destination}`)
          mv(tempPath, destination, err => err ? reject(err) : resolve())
        })
      })
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
  const setConfig = config => (
    fs.writeFileSync(packageJson, JSON.stringify(config, null, 2))
  )
  const getConfig = () => JSON.parse(fs.readFileSync(packageJson))
  return {
    /**
     * Install npm package
     * @param  {String} name Name of package in npm registry
     *
     * @param  {Object} options
     *             version {String} Version of npm package. Default is latest version
     *             middleware {Function<Promise>}
     *               Function that returns promise. Called when package's archive is extracted
     *               to temp folder, but before moving to real location
     * @return {Promise}
     */
    async install(name, options = {}) {
      let versionToInstall
      const version = options.version || null
      const middleware = options.middleware || (() => Promise.resolve())

      console.group('[npm] Install package', name)

      try {
        const resJson = await fetch(`${API_BASE}${name}`).then(response => response.json())

        versionToInstall = version || resJson['dist-tags'].latest
        console.log('Version:', versionToInstall)
        await installPackage(
          resJson.versions[versionToInstall].dist.tarball,
          path.join(dir, 'node_modules', name),
          middleware
        )

        const json = getConfig()
        json.dependencies[name] = versionToInstall
        console.log('Add package to dependencies')
        setConfig(json)
        console.groupEnd()
      } catch (err) {
        console.log('Error in package installation')
        console.log(err)
        console.groupEnd()
      }
    },

    update(name) {
      // Plugin update is downloading `.tar` and unarchiving it to temp folder
      // Only if this part was succeeded, current version of plugin is uninstalled
      // and temp folder moved to real plugin location
      const middleware = () => this.uninstall(name)
      return this.install(name, { middleware })
    },

    /**
     * Uninstall npm package
     *
     * @param  {String} name
     * @return {Promise}
     */
    async uninstall(name) {
      const modulePath = path.join(dir, 'node_modules', name)
      console.group('[npm] Uninstall package', name)
      console.log('Remove package directory ', modulePath)
      try {
        try { removeDir(modulePath) } catch (err) { console.log(err) }

        const json = getConfig()
        console.log('Update package.json')
        delete json.dependencies[name]

        console.log('Rewrite package.json')
        setConfig(json)

        console.groupEnd()
        return true
      } catch (err) {
        console.log('Error in package uninstallation')
        console.log(err)
        console.groupEnd()
      }
    }
  }
}
