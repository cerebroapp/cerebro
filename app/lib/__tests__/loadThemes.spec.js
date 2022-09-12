import themesLoader from '../loadThemes'

const productionThemes = [
  {
    value: '../dist/main/css/themes/light.css',
    label: 'Light'
  },
  {
    value: '../dist/main/css/themes/dark.css',
    label: 'Dark'
  }
]

const developmentThemes = [
  {
    value: 'http://localhost:3000/dist/main/css/themes/light.css',
    label: 'Light'
  },
  {
    value: 'http://localhost:3000/dist/main/css/themes/dark.css',
    label: 'Dark'
  }
]

test('returns themes for production', () => {
  expect(themesLoader()).toEqual(productionThemes)
})

test('returns themes for development', () => {
  process.env.NODE_ENV = 'development'
  expect(themesLoader()).toEqual(developmentThemes)
})
