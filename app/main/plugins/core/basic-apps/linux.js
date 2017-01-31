import { remote } from 'electron'
import path from 'path'
import fs from 'fs'
import uniq from 'lodash/uniq'

let appDirs = [
  path.join(remote.app.getPath('home'), '.local', 'share')
]

if (!!process.env.XDG_DATA_DIRS) {
  appDirs = [
    ...appDirs,
    ...process.env.XDG_DATA_DIRS.split(':')
  ]
}

appDirs = appDirs.map(dir => path.join(dir, 'applications'))

export const DIRECTORIES = uniq([
  ...appDirs,
  path.join('usr', 'share', 'app-install', 'desktop')
]).filter(dir => fs.existsSync(dir))

export const EXTENSIONS = ['desktop']

const parseDesktopFile = (filePath, mapping) => {
  const content = fs.readFileSync(filePath, 'utf-8')
  return Object.keys(mapping).reduce((acc, key) => {
    let value = ''
    const regexp = new RegExp(`^${mapping[key]}=(.+)$`, 'm')
    const match = content.match(regexp)
    if (match) {
      value = match[1]
    }
    return {
      ...acc,
      [key]: value
    }
  }, {})
}

export const formatPath = (filePath) => {
  const parsedData = parseDesktopFile(filePath, {
    name: 'Name',
    description: 'Comment',
    exec: 'Exec'
  })
  const filename = path.basename(filePath)
  return {
    ...parsedData,
    filename,
    name: parsedData.name || filename.replace(/\.(desktop)/, ''),
    path: filePath
  }
}
