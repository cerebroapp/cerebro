import path from 'path'
import getAbbr from 'lib/getAbbr'
import { shell } from 'electron'

const { APPDATA, ProgramData, USERPROFILE } = process.env

const parseFile = (filePath) => {
  try {
    const details = shell.readShortcutLink(filePath)
    return {
      path: details.target,
      description: details.description,
      icon: details.target
    }
  } catch (e) {
    return {
      path: filePath,
      icon: filePath
    }
  }
}

export const DIRECTORIES = [
  USERPROFILE && `${USERPROFILE}\\Desktop\\`,
  APPDATA && `${APPDATA}\\Microsoft\\Windows\\Start Menu\\Programs\\`,
  ProgramData && `${ProgramData}\\Microsoft\\Windows\\Start Menu\\Programs\\`
].filter(dir => !!dir)

export const EXTENSIONS = ['lnk', 'exe']

export const openApp = app => shell.openItem(app.source)

export const toString = app => `${app.name} ${app.filename} ${getAbbr(app.name)}`

export const formatPath = filePath => ({
  ...parseFile(filePath),
  id: filePath,
  source: filePath,
  // TODO: check if file is hidden or not
  hidden: false,
  filename: path.basename(filePath),
  name: path.basename(filePath).replace(/\.(exe|lnk)/, ''),
})
