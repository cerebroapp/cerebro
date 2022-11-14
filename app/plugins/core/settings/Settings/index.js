import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormComponents } from '@cerebroapp/cerebro-ui'
import themes from 'lib/themes'

import Hotkey from './Hotkey'
import countries from './countries'
import styles from './styles.module.css'

const {
  Select, Checkbox, Wrapper, Text
} = FormComponents

function Settings({ get, set }) {
  const [state, setState] = useState(() => ({
    hotkey: get('hotkey'),
    showInTray: get('showInTray'),
    country: get('country'),
    theme: get('theme'),
    proxy: get('proxy'),
    developerMode: get('developerMode'),
    cleanOnHide: get('cleanOnHide'),
    selectOnShow: get('selectOnShow'),
    pluginsSettings: get('plugins'),
    crashreportingEnabled: get('crashreportingEnabled'),
    openAtLogin: get('openAtLogin')
  }))

  const changeConfig = (key, value) => {
    set(key, value)
    setState((prevState) => ({ ...prevState, [key]: value }))
  }

  return (
    <div className={styles.settings}>
      <Wrapper label="Hotkey" description="Type your global shortcut for Cerebro in this input">
        <Hotkey
          hotkey={state.hotkey}
          onChange={(key) => changeConfig('hotkey', key)}
        />
      </Wrapper>
      <Select
        label="Country"
        description="Choose your country so Cerebro can better choose currency, language, etc."
        value={countries.find((c) => c.value === state.country)}
        options={countries}
        onChange={(value) => changeConfig('country', value)}
      />
      <Select
        label="Theme"
        value={themes.find((t) => t.value === state.theme)}
        options={themes}
        onChange={(value) => changeConfig('theme', value)}
      />
      <Text
        type="text"
        label="Proxy"
        value={state.proxy}
        onChange={(value) => changeConfig('proxy', value)}
      />
      <Checkbox
        label="Open at login"
        value={state.openAtLogin}
        onChange={(value) => changeConfig('openAtLogin', value)}
      />
      <Checkbox
        label="Show in menu bar"
        value={state.showInTray}
        onChange={(value) => changeConfig('showInTray', value)}
      />
      <Checkbox
        label="Developer Mode"
        value={state.developerMode}
        onChange={(value) => changeConfig('developerMode', value)}
      />
      <Checkbox
        label="Clean results on hide"
        value={state.cleanOnHide}
        onChange={(value) => changeConfig('cleanOnHide', value)}
      />
      <Checkbox
        label="Select input on show"
        value={state.selectOnShow}
        onChange={(value) => changeConfig('selectOnShow', value)}
      />
      <Checkbox
        label="Send automatic crash reports (requires restart)"
        value={state.crashreportingEnabled}
        onChange={(value) => changeConfig('crashreportingEnabled', value)}
      />
    </div>
  )
}

Settings.propTypes = {
  get: PropTypes.func.isRequired,
  set: PropTypes.func.isRequired
}

export default Settings
