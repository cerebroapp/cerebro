import core from './core'
import getExternalPlugins from './externalPlugins'

const getCorePlugins = () => core

const getAllPlugins = () => ({ ...core, ...getExternalPlugins() })

const pluginsService = {
  getExternalPlugins,
  getCorePlugins,
  getAllPlugins,
}

export default pluginsService
