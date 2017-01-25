import glob from 'glob'
import path from 'path'
import fs from 'fs'

const { APPDATA, ProgramData, USERPROFILE } = process.env

const DIRECTORIES = [
  USERPROFILE && `${USERPROFILE}\\Desktop\\`,
  APPDATA && `${APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\`,
  ProgramData && `${ProgramData}\\Microsoft\\Windows\\Start Menu\\Programs\\`
].filter(dir => !!dir)

const CACHE_TIME = 30 * 60 * 1000

const getAppsList = (onFound) => {
  DIRECTORIES.forEach(dir => {
    glob(`${dir}\\**\\*.+(lnk|exe)`, {}, onFound)
  })
}

const formatPath = (filePath) => ({
  path: filePath,
  filename: path.basename(filePath),
  name: path.basename(filePath).replace(/\.(exe|lnk)/, ''),
})

export default (callback) => {
  const searchApps = () => getAppsList((err, files) => {
    const apps = files.map(formatPath)
    callback(apps)
  })

  setInterval(searchApps, CACHE_TIME)
  searchApps()
  DIRECTORIES.forEach(dir => fs.watch(dir, {}, searchApps))
}
