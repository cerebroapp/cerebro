import React, { PropTypes } from 'react'
import settingsStyles from '../styles.css'

const Checkbox = ({ label, value, onChange, description }) => (
  <div className={settingsStyles.item}>
    <div className={settingsStyles.itemValueWithoutLabel}>
      <label>
        <input
          type="checkbox"
          checked={value}
          onChange={({ target }) => onChange(target.checked)}
          className={settingsStyles.checkbox}
        />
      {description}
      </label>
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
