import React, { Component } from 'react';
import { get, set } from 'lib/config';
import Hotkey from './Hotkey';
import styles from './styles.css';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotkey: get('hotkey')
    }
    this.onChangeHotkey = this.onChangeHotkey.bind(this);
  }
  onChangeHotkey(newKey) {
    set('hotkey', newKey);
    this.setState({hotkey: newKey});
  }
  render() {
    const { hotkey } = this.state;
    return (
      <div className={styles.settings}>
        <div className={styles.item}>
          <label className={styles.label}>Hotkey:</label>
          <div className={styles.itemValue}>
            <Hotkey hotkey={hotkey} onChange={this.onChangeHotkey} />
            <div className={styles.itemNotice}>
              Type your global shortcut for Cerebro in this input.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
