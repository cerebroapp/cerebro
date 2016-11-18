import React, { Component } from 'react';
import config from 'lib/config';
import Hotkey from './Hotkey';
import CountrySelect from './CountrySelect';
import Select from 'react-select';
import loadThemes from 'lib/loadThemes';
import styles from './styles.css';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotkey: config.get('hotkey'),
      showInTray: config.get('showInTray'),
      country: config.get('country'),
      theme: config.get('theme'),
    }
    this.changeConfig = this.changeConfig.bind(this);
  }
  changeConfig(key, value) {
    config.set(key, value);
    this.setState({
      [key]: value
    });
  }
  render() {
    const { hotkey, showInTray, country, theme } = this.state;
    return (
      <div className={styles.settings}>
        <div className={styles.item}>
          <label className={styles.label}>Hotkey:</label>
          <div className={styles.itemValue}>
            <Hotkey
              hotkey={hotkey}
              onChange={(key) => this.changeConfig('hotkey', key)}
            />
            <div className={styles.itemNotice}>
              Type your global shortcut for Cerebro in this input.
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Country:</label>
          <div className={styles.itemValue}>
            <CountrySelect
              value={country}
              onChange={({value}) => this.changeConfig('country', value)}
            />
            <div className={styles.itemNotice}>
              Choose your country so Cerebro can better choose currency, language, etc.
            </div>
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Theme:</label>
          <div className={styles.itemValue}>
            <Select
              value={theme}
              options={loadThemes()}
              clearable={false}
              onChange={({value}) => this.changeConfig('theme', value)}
            />
          </div>
        </div>

        <div className={styles.item}>
          <div className={styles.itemValueWithoutLabel}>
            <label>
              <input
                type='checkbox'
                checked={showInTray}
                onChange={({target}) => this.changeConfig('showInTray', target.checked)}
                className={styles.checkbox}
              />
              Show in menu bar
            </label>
          </div>
        </div>
      </div>
    );
  }
}
