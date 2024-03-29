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

export const pluginsPath = path.join(process.env.CEREBRO_DATA_PATH, 'plugins')
export const modulesDirectory = path.join(pluginsPath, 'node_modules')
export const packageJsonPath = path.join(pluginsPath, 'package.json')

export const ensureFiles = () => {
  ensureDir(pluginsPath)
  ensureDir(modulesDirectory)
  ensureFile(packageJsonPath, EMPTY_PACKAGE_JSON)
}

export const client = npm(pluginsPath)
export { default as settings } from './settings'
