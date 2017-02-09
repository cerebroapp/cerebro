import { remote } from 'electron'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import flatten from 'lodash/flatten'
import uniq from 'lodash/uniq'

const REINDEX_TIME = 30 * 60 * 1000
const CACHE_FILE = path.join(remote.app.getPath('userData'), 'apps_cache.json')
const cacheOptions = {
  encoding: 'utf-8'
}

const { DIRECTORIES, EXTENSIONS, formatPath } = process.platform === 'win32'
  ? require('./windows')
  : require('./linux')

const getAppsList = () => {
  const promises = DIRECTORIES.map(dir => (
    new Promise((resolve, reject) => {
      const pattern = path.join(dir, '**', `*.+(${EXTENSIONS.join('|')})`)
      glob(pattern, {}, (err, files) => err ? reject(err) : resolve(files))
    })
  ))
  return Promise.all(promises).then(apps => (
    uniq(flatten(apps)).map(formatPath).filter(app => !app.hidden)
  ))
}

export default (callback) => {
  fs.exists(CACHE_FILE, (exists) => {
    if (!exists) return
    fs.readFile(CACHE_FILE, cacheOptions, (err, json) => {
      if (!err) callback(JSON.parse(json))
    })
  })

  const searchApps = () => getAppsList().then(apps => {
    const json = JSON.stringify(apps)
    fs.writeFile(CACHE_FILE, json, cacheOptions)
    callback(apps)
  })

  setInterval(searchApps, REINDEX_TIME)
  searchApps()
  DIRECTORIES.forEach(dir => fs.watch(dir, {}, searchApps))
}
