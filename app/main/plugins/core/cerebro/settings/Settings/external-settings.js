import React, { PropTypes, Component } from 'react'
import loadThemes from 'lib/loadThemes'
import styles from './styles.css'
import hotkeyStyles from './Hotkey/styles.css'
import { Checkbox, Input, Select, Options } from './components'

export default class ExternalSettings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  changeSetting(plugin, label, value) {
    this.props.settings[plugin][label].value = value
    this.props.onChange(this.props.settings)
  }

  renderSetting(label, setting, plugin) {
    const { type, value, description } = setting

    if (type == 'bool') {
      return (
        <Checkbox
          key={label}
          value={value}
          onChange={({ target }) => this.changeSetting(plugin, label, target.checked)}
          description={description}
        />
      )
    }

    if (type == 'array') {
      return (
        <Select
          key={label}
          label={label}
          value={value || []}
          onChange={newValue => this.changeSetting(plugin, label, newValue)}
          description={description}
        />
      )
    }

    if (type == 'option') {
      const { multi } = setting
      const options = setting.options.map(option => ({ label: option, value: option }))

      return (
        <Options
          key={label}
          label={label}
          value={value}
          onChange={newValue => {
            const value = multi ? newValue.map(val => val.value) : newValue.value
            this.changeSetting(plugin, label, value)
          }}
          description={description}
          options={options}
          multi={multi}
        />
      )
    }

    return (
      <Input
        key={label}
        label={label}
        value={value}
        onChange={({ target }) => this.changeSetting(plugin, label, target.value)}
        inputType={type}
        description={description}
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
