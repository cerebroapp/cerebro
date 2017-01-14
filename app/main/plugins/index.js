const core = require('./core')
const loadExternalPlugins = require('./loadExternalPlugins')

export default {
  ...core,
  ...loadExternalPlugins(),
}
