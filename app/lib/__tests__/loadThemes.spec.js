import themes from '../themes'

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

test('returns themes for production', () => {
  expect(themes).toEqual(productionThemes)
})
