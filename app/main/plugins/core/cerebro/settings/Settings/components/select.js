import React, { PropTypes } from 'react'
import { Creatable } from 'react-select'
import styles from '../styles.css'

const Select = (props) => (
  <div className={styles.item}>
    <div className={styles.itemValue}>
      <Creatable
        multi
        value={props.value}
        placeholder={props.label}
        onChange={props.onChange}
      />
      {props.description
        ? <div className={styles.itemNotice}>{props.description}</div>
        : ''}
    </div>
  </div>
)

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Select
