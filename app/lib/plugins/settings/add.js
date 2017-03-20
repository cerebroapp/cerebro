import config from 'lib/config'

export default (pluginName, { settings = {} }) => {
  const pluginSettings = config.get('plugins')[pluginName] || {}
  Object
    .keys(settings)
    .filter(key => !pluginSettings.hasOwnProperty(key))
    .forEach(key => {
      pluginSettings[key] = settings[key].defaultValue || null
    })

  Object
    .keys(pluginSettings)
    .filter(key => !settings.hasOwnProperty(key))
    .forEach(key => delete pluginSettings[key])

  config.set('plugins', {
    ...config.get('plugins'),
    [pluginName]: pluginSettings,
  })
}
