import React, { PropTypes, Component } from 'react'
import Hotkey from './Hotkey'
import countries from './countries'
import { Select, Checkbox, Wrapper, Text } from 'cerebro-ui/Form'
import loadThemes from 'lib/loadThemes'
import styles from './styles.css'

class Settings extends Component {
  constructor(props) {
    super(props)
    const { get } = this.props
    this.state = {
      hotkey: get('hotkey'),
      showInTray: get('showInTray'),
      country: get('country'),
      theme: get('theme'),
      proxy: get('proxy'),
      developerMode: get('developerMode'),
      cleanOnHide: get('cleanOnHide'),
      pluginsSettings: get('plugins'),
      trackingEnabled: get('trackingEnabled'),
      crashreportingEnabled: get('crashreportingEnabled'),
      openAtLogin: get('openAtLogin')
    }
    this.changeConfig = this.changeConfig.bind(this)
  }
  changeConfig(key, value) {
    this.props.set(key, value)
    this.setState({
      [key]: value
    })
  }
  render() {
    const {
      hotkey, showInTray, country, theme, proxy, developerMode, cleanOnHide, openAtLogin,
      trackingEnabled, crashreportingEnabled
    } = this.state

    return (
      <div className={styles.settings}>
        <Wrapper label="Hotkey" description="Type your global shortcut for Cerebro in this input">
          <Hotkey
            hotkey={hotkey}
            onChange={(key) => this.changeConfig('hotkey', key)}
          />
        </Wrapper>
        <Select
          label="Country"
          description="Choose your country so Cerebro can better choose currency, language, etc."
          value={country}
          options={countries}
          onChange={value => this.changeConfig('country', value)}
        />
        <Select
          label="Theme"
          value={theme}
          options={loadThemes()}
          onChange={value => this.changeConfig('theme', value)}
        />
        <Text
          label="Proxy"
          value={proxy}
          onChange={value => this.changeConfig('proxy', value)}
        />
        <Checkbox
          label="Open at login"
          value={openAtLogin}
          onChange={value => this.changeConfig('openAtLogin', value)}
        />
        <Checkbox
          label="Show in menu bar"
          value={showInTray}
          onChange={value => this.changeConfig('showInTray', value)}
        />
        <Checkbox
          label="Developer Mode"
          value={developerMode}
          onChange={value => this.changeConfig('developerMode', value)}
        />
        <Checkbox
          label="Clean results on hide"
          value={cleanOnHide}
          onChange={value => this.changeConfig('cleanOnHide', value)}
        />
        <Checkbox
          label="Send anonymous statistics (requires restart)"
          value={trackingEnabled}
          onChange={value => this.changeConfig('trackingEnabled', value)}
        />
        <Checkbox
          label="Send automatic crash reports (requires restart)"
          value={crashreportingEnabled}
          onChange={value => this.changeConfig('crashreportingEnabled', value)}
        />
      </div>
    )
  }
}

Settings.propTypes = {
  get: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired
}

export default Settings
