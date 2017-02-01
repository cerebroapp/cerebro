import { remote } from 'electron'
import path from 'path'
import fs from 'fs'
import uniq from 'lodash/uniq'
import { shellCommand } from 'cerebro-tools'

let appDirs = [
  path.join(remote.app.getPath('home'), '.local', 'share'),
  path.join('/usr', 'share'),
  path.join('/usr', 'share', 'ubuntu'),
  path.join('/usr', 'share', 'gnome'),
  path.join('/usr', 'local', 'share'),
  path.join('/var', 'lib', 'snapd', 'desktop')
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

export const openApp = ({ exec }) => {
  if (exec) {
    // Replace %u and other % arguments in exec script
    // https://github.com/KELiON/cerebro/pull/62#issuecomment-276511320
    const cmd = exec.replace(/%./g, '')
    shellCommand(cmd)
  }
}

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

const getId = (filePath) => {
  const match = filePath.match(/\/applications\/(.+)$/)
  return match ? match[1] : filePath
}

export const toString = (app) => app.name

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
    id: getId(filePath),
    name: parsedData.name || filename.replace(/\.(desktop)/, ''),
    path: filePath
  }
}
