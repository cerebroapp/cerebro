import React, { PropTypes, Component } from 'react'
import Hotkey from './Hotkey'
import countries from './countries'
import { Select, Checkbox } from 'main/components/Form'
import Wrapper from 'main/components/Form/Wrapper'
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
      developerMode: get('developerMode'),
      cleanOnHide: get('cleanOnHide'),
      pluginsSettings: get('plugins'),
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
      hotkey, showInTray, country, theme, developerMode, cleanOnHide
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
      </div>
    )
  }
}

Settings.propTypes = {
  get: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired
}

export default Settings
