import getAppDataPath from 'appdata-path'
import path from 'path'
import fs from 'fs'
import npm from './npm'

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

export const pluginsPath = path.join(getAppDataPath('Cerebro'), 'plugins')
export const modulesDirectory = path.join(pluginsPath, 'node_modules')
export const cerebroappModulesDirectory = path.join(pluginsPath, 'node_modules', '@cerebroapp')
export const packageJsonPath = path.join(pluginsPath, 'package.json')

export const ensureFiles = () => {
  ensureDir(pluginsPath)
  ensureDir(modulesDirectory)
  ensureFile(packageJsonPath, EMPTY_PACKAGE_JSON)
}

export const client = npm(pluginsPath)
export { default as settings } from './settings'
