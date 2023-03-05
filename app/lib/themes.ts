const prefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '../'

type Theme = { value: string, label: string}

const themes: Array<Theme> = [
  {
    value: `${prefix}dist/main/css/themes/light.css`,
    label: 'Light'
  },
  {
    value: `${prefix}dist/main/css/themes/dark.css`,
    label: 'Dark'
  }
]

export default themes
