import React from 'react'
import styles from '../styles.css'
import hotkeyStyles from '../Hotkey/styles.css'

export default (props) => (
  <div className={styles.item}>
    <label className={styles.label}>{props.label}:</label>
    <div className={styles.itemValue}>
      <input
        type={props.inputType}
        value={props.value}
        className={hotkeyStyles.hotkeyInput}
        onChange={props.onChange}
      />
      {props.description
        ? <div className={styles.itemNotice}>{props.description}</div>
        : ''}
    </div>
  </div>
)
