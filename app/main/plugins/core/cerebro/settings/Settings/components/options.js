import React from 'react'
import Select, { Creatable } from 'react-select'
import styles from '../styles.css'

export default (props) => (
  <div className={styles.item}>
    <div className={styles.itemValue}>
      <Creatable
        multi={props.multi}
        value={props.value}
        placeholder={props.label}
        options={props.options}
        onChange={props.onChange}
      />
      {props.description
        ? <div className={styles.itemNotice}>{props.description}</div>
        : ''}
    </div>
  </div>
)
