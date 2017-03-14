import React, { PropTypes } from 'react'
import settingsStyles from '../styles.css'
import styles from './styles.css'

const Input = ({ label, value, onChange, description, type }) => (
  <div className={settingsStyles.item}>
    <label className={settingsStyles.label}>{label}:</label>
    <div className={settingsStyles.itemValue}>
      <input
        type={type}
        value={value}
        className={styles.hotkeyInput}
        onChange={({ target }) => onChange(target.value)}
      />
      <div className={settingsStyles.itemNotice}>{description}</div>
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
