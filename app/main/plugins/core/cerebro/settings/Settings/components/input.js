import React, { PropTypes } from 'react'
import styles from '../styles.css'

const Input = ({ label, value, onChange, description, type }) => (
  <div className={styles.item}>
    <label className={styles.label}>{label}:</label>
    <div className={styles.itemValue}>
      <input
        type={type}
        value={value}
        className={styles.input}
        onChange={({ target }) => onChange(target.value)}
      />
      <div className={styles.itemNotice}>{description}</div>
    </div>
  </div>
)

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default Input
