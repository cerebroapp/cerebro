import core from './core'
import getExternalPlugins from './externalPlugins'

const pluginsService = {
  corePlugins: core,
  allPlugins: { ...core, ...getExternalPlugins() },
  externalPlugins: getExternalPlugins()
}

export default pluginsService
