import React, { PropTypes } from 'react'
import Checkbox from './checkbox'
import Input from './input'
import Select from './select'
import Options from './options'

const components = {
  bool: Checkbox,
  option: Options,
  array: Select,
}

const SettingsComponent = ({ type, ...props }) => {
  const Component = components[type] || Input

  return (
    <Component type={type} {...props} />
  )
}

SettingsComponent.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
}

export default SettingsComponent
