import React from 'react'
import PropTypes from 'prop-types'
import { Select, Text, Checkbox } from 'cerebro-ui/Form'

const components = {
  bool: Checkbox,
  option: Select,
}

const FormItem = ({ type, ...props }) => {
  const Component = components[type] || Text

  return (
    <Component type={type} {...props} />
  )
}

FormItem.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
}

export default FormItem
