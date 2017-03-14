import React, { PropTypes } from 'react'
import { Creatable } from 'react-select'
import styles from '../styles.css'

const Select = ({ label, value, onChange, description }) => (
  <div className={styles.item}>
    <div className={styles.itemValue}>
      <Creatable
        multi
        value={value.map(val => ({ value: val, label: val }))}
        placeholder={label}
        onChange={newValue => onChange(newValue.map(val => val.value))}
      />
      <div className={styles.itemNotice}>{description}</div>
    </div>
  </div>
)

Select.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arary,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Select
