import React, { PropTypes, Component } from 'react'
import loadThemes from 'lib/loadThemes'
import styles from './styles.css'
import hotkeyStyles from './Hotkey/styles.css'
import { Checkbox, Input, Select, Option } from './components'

export default class ExternalSettings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
  }

  renderSetting(label, setting, plugin) {
    const { type, value, description } = setting

    if (type == 'bool') {
      return (
        <Checkbox
          key={label}
          value={value}
          description={description}
        />
      )
    }

    if (type == 'array') {
      return (
        <Select
          key={label}
          label={label}
          description={description}
        />
      )
    }

    if (type == 'option') {
      const { multi } = setting
      const options = setting.options.map(option => ({ label: option, value: option }))

      return (
        <Option
          key={label}
          label={label}
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
        inputType={type}
        value={value}
        description={description}
      />
    )
  }

  render() {
    const { settings } = this.props

    return (
      <div>
        {Object.keys(settings).map(plugin => {
          return (
            <div key={plugin} className={styles.settingItem}>
              <label className={styles.header}>{plugin}</label>

              {Object.keys(settings[plugin]).map(label => {
                const setting = settings[plugin][label]
                return this.renderSetting(label, setting, plugin)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
