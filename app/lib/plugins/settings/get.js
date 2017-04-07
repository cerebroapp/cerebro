import config from 'lib/config'

export default (pluginName) => config.get('plugins')[pluginName]
