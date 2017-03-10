import React from 'react'
import styles from '../styles.css'

export default (props) => (
  <div className={styles.item}>
    <div className={styles.itemValueWithoutLabel}>
      <label>
        <input
          type="checkbox"
          checked={props.value}
          onChange={props.onChange}
          className={styles.checkbox}
        />
        {props.description}
      </label>
    </div>
  </div>
)
