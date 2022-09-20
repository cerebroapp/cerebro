import React, { useState } from 'react'
import PropTypes from 'prop-types'
import config from 'lib/config'
import FormItem from './FormItem'
import styles from './styles.module.css'

function Settings({ settings, name }) {
  const [values, setValues] = useState(() => config.get('plugins')[name] || {})

  const changeSetting = (label, value) => {
    setValues((prev) => ({ ...prev, [label]: value }))

    config.set('plugins', {
      ...config.get('plugins'),
      [name]: values,
    })
  }

  const renderSetting = (key) => {
    const setting = settings[key]
    const { defaultValue, label, ...restProps } = setting
    const value = values[key] || defaultValue

    return (
      <FormItem
        key={key}
        label={label || key}
        value={value}
        onChange={(newValue) => changeSetting(key, newValue)}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    )
  }

  return (
    <div className={styles.settingsWrapper}>
      { Object.keys(settings).map(renderSetting) }
    </div>
  )
}

export default Settings

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
}
