import React, { useState } from 'react'
import PropTypes from 'prop-types'
import config from 'lib/config'
import FormItem from './FormItem'
import styles from './styles.module.css'

function FormSettings({ settings, name, key }) {
  const [values, setValues] = useState(config.get('plugins')[name] || {})
  const setting = settings[key]
  const { defaultValue, label, ...restProps } = setting
  const value = key in values ? values[key] : defaultValue

  const changeSetting = (plugin, settingLabel, settingValue) => {
    const newValues = {
      ...values,
      [settingLabel]: settingValue,
    }

    setValues(values)
    config.set('plugins', {
      ...config.get('plugins'),
      [name]: newValues,
    })
  }

  return (
    <FormItem
      key={key}
      label={label || key}
      value={value}
      onChange={(newValue) => changeSetting(name, key, newValue)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  )
}

function Settings({ settings, name }) {
  return (
    <div className={styles.settingsWrapper}>
      {Object.keys(settings).map(<FormSettings settings={settings} name={name} />)}
    </div>
  )
}

export default Settings

FormSettings.propTypes = {
  name: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  key: PropTypes.string.isRequired,
}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
}
