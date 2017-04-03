import React, { PropTypes } from 'react'
import styles from './styles.css'

const Checkbox = ({ label, value, onChange, description }) => (
  <div className={styles.item}>
    <div className={styles.itemValueWithoutLabel}>
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={({ target }) => onChange(target.checked)}
          className={styles.checkbox}
        />
      {label}
      </label>
      <div className={styles.itemNotice}>{description}</div>
    </div>
  </div>
)

Checkbox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
}

export default Checkbox
