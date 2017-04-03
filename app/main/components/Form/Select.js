import React, { PropTypes } from 'react'
import ReactSelect, { Creatable } from 'react-select'
import Wrapper from './Wrapper'

const Select = ({ label, value, onChange, description, options, multi, clearable, creatable }) => {
  const Component = creatable ? Creatable : ReactSelect
  return (
    <Wrapper label={label} description={description}>
      <Component
        multi={multi}
        value={value}
        clearable={clearable}
        options={options}
        onChange={newValue => {
          const changedValue = multi ? newValue.map(val => val.value) : newValue.value
          onChange(changedValue)
        }}
      />
    </Wrapper>
  )
}

Select.propTypes = {
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
  clearable: PropTypes.bool,
  creatable: PropTypes.bool
}

export default Select
