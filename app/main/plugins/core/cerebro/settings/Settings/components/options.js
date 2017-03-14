import React, { PropTypes } from 'react'
import Select from 'react-select'
import settingsStyles from '../styles.css'

const Options = ({ label, value, onChange, description, options, multi }) => (
  <div className={settingsStyles.item}>
    <div className={settingsStyles.itemValue}>
      <Select
        multi={multi}
        value={value}
        placeholder={label}
        options={options.map(option => ({ label: option, value: option }))}
        onChange={newValue => {
          const changedValue = multi ? newValue.map(val => val.value) : newValue.value
          onChange(changedValue)
        }}
      />
      <div className={settingsStyles.itemNotice}>{description}</div>
    </div>
  </div>
)

Options.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  description: PropTypes.string,
  options: PropTypes.array.isRequired,
  multi: PropTypes.bool,
}

export default Options
