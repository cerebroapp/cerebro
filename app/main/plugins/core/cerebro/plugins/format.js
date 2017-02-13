import lowerCase from 'lodash/lowerCase'
import words from 'lodash/words'
import capitalize from 'lodash/capitalize'
import trim from 'lodash/trim'
import compose from 'lodash/fp/compose'
import map from 'lodash/fp/map'
import join from 'lodash/fp/join'

const removeNoise = (str) => str.replace(/^cerebro\s?(plugin)?\s?(to)?/i, '')

export const name = compose(
  join(' '),
  map(capitalize),
  words,
  trim,
  removeNoise,
  lowerCase
)

export const description = compose(
  capitalize,
  trim,
  removeNoise
)
