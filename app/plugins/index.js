import core from './core'
import getExternalPlugins from './externalPlugins'

class PluginsService {
  getCorePlugins() {
    return core
  }

  getExternalPlugins() {
    return getExternalPlugins()
  }

  getAllPlugins() {
    return { ...core, ...getExternalPlugins() }
  }
}

export default new PluginsService()
