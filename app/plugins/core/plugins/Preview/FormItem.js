import React from 'react'
import PropTypes from 'prop-types'
import { FormComponents } from '@cerebroapp/cerebro-ui'

const { Checkbox, Select, Text } = FormComponents

const components = {
  bool: Checkbox,
  option: Select,
}

function FormItem({ type, ...props }) {
  const Component = components[type] || Text

  return <Component type={type} {...props} />
}

FormItem.propTypes = {
  value: PropTypes.any,
  type: PropTypes.string.isRequired,
}

export default FormItem
