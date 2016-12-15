import * as core from './core'
import loadExternalPlugins from './loadExternalPlugins'

export default {
  ...core,
  ...loadExternalPlugins(),
}
