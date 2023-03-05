import core from './core'
import externalPlugins from './externalPlugins'

const pluginsService = {
  corePlugins: core,
  allPlugins: Object.assign(externalPlugins, core),
  externalPlugins,
}

export default pluginsService
