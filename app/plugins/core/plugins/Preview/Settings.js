import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'lib/config'
import FormItem from './FormItem'
import styles from './styles.module.css'

export default class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      values: config.get('plugins')[props.name] || {},
    }
    this.renderSetting = this.renderSetting.bind(this)
    this.changeSetting = this.changeSetting.bind(this)
  }

  changeSetting(plugin, label, value) {
    const values = {
      ...this.state.values,
      [label]: value,
    }

    this.setState({ values })
    config.set('plugins', {
      ...config.get('plugins'),
      [this.props.name]: values,
    })
  }

  renderSetting(key) {
    const setting = this.props.settings[key]
    const { defaultValue, label, ...restProps } = setting
    const value = key in this.state.values ? this.state.values[key] : defaultValue

    return (
      <FormItem
        key={key}
        label={label || key}
        value={value}
        onChange={(newValue) => this.changeSetting(this.props.name, key, newValue)}
        {...restProps}
      />
    )
  }

  render() {
    return (
      <div className={styles.settingsWrapper}>
        { Object.keys(this.props.settings).map(this.renderSetting) }
      </div>
    )
  }
}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
}
