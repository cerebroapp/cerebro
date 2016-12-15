/**
 * Load all available themes
 *
 * @return {Array<Object>} Array of objects {value, label}.
 *                         Label is text that is shown in preferences theme selector
 */
export default () => {
  const prefix = process.env.HOT ? 'http://localhost:3000/' : '../'
  return [
    {
      value: `${prefix}dist/main/css/themes/light.css`,
      label: 'Light'
    },
    {
      value: `${prefix}dist/main/css/themes/dark.css`,
      label: 'Dark'
    }
  ]
}
