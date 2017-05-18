import { every } from 'lodash/fp'

const VALID_TYPES = new Set([
  'string',
  'number',
  'bool',
  'option',
])

const validSetting = ({ type, options }) => {
  // General validation of settings
  if (!type || !VALID_TYPES.has(type)) return false

  // Type-specific validations
  if (type === 'option') return Array.isArray(options) && options.length

  return true
}

export default ({ settings }) => {
  if (!settings) return true
  return every(validSetting)(settings)
}
