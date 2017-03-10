import { app, remote } from 'electron'
import path from 'path'
import npm from './npm'
import fs from 'fs'

const ensureFile = (src, content = '') => {
  if (!fs.existsSync(src)) {
    fs.writeFileSync(src, content)
  }
}

const ensureDir = (src) => {
  if (!fs.existsSync(src)) {
    fs.mkdirSync(src)
  }
}

const EMPTY_PACKAGE_JSON = JSON.stringify({
  name: 'cerebro-plugins',
  dependencies: {}
}, null, 2)

const electronApp = remote ? remote.app : app
export const pluginsPath = path.join(electronApp.getPath('userData'), 'plugins')
export const modulesDirectory = path.join(pluginsPath, 'node_modules')
export const packageJsonPath = path.join(pluginsPath, 'package.json')

export const ensureFiles = () => {
  ensureDir(pluginsPath)
  ensureDir(modulesDirectory)
  ensureFile(packageJsonPath, EMPTY_PACKAGE_JSON)
}

export const client = npm(pluginsPath)
export { default as addSettings } from './settings'
