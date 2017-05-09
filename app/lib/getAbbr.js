import lowerCase from 'lodash/lowerCase'

/**
 * Get app name abbreviation, i.e.
 *   League of Legends -> lol
 *   AudioBookBinder -> abb
 * @param  {String} name
 * @return {String}
 */
export default name => (
  lowerCase(name)
    .split(' ')
    .map(word => word[0])
    .join('')
)
