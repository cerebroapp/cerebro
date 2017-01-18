import React from 'react'
import countries from './countries'
import Select from 'react-select'

export default (props) => (
  <Select {...props} options={countries} />
)
