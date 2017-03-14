import React, { PropTypes, Component } from 'react'
import styles from './styles.css'
import SettingsComponent from './components'

export default class ExternalSettings extends Component {
  changeSetting(plugin, label, value) {
    this.props.settings[plugin][label].value = value
    this.props.onChange(this.props.settings)
  }

  renderSetting(label, setting, plugin) {
    const { value, defaultValue, ...restProps } = setting

    return (
      <SettingsComponent
        key={label}
        label={label}
        value={value || defaultValue}
        onChange={newValue => this.changeSetting(plugin, label, newValue)}
        {...restProps}
      />
    )
  }

  render() {
    const { settings } = this.props

    return (
      <div>
        {Object.keys(settings).map(plugin => (
          <div key={plugin} className={styles.settingItem}>
            <label className={styles.header}>{plugin}</label>

            {Object.keys(settings[plugin]).map(label => {
              const setting = settings[plugin][label]
              return this.renderSetting(label, setting, plugin)
            })}
          </div>
        ))}
      </div>
    )
  }
}

ExternalSettings.propTypes = {
  settings: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}
