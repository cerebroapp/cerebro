import { LANGS, SYNONIMS } from './constants'

/**
 * Convert user-entered language name to language code
 *
 * @param  {String} lang User-entered name of language
 * @return {String}
 */
export default (lang) => {
  if (!lang) {
    return LANGS[0]
  }
  let result = lang
  if (SYNONIMS[result]) {
    result = SYNONIMS[result]
  } else {
    const synonim = Object
      .keys(SYNONIMS)
      .filter(key => key.indexOf('*') !== -1)
      .find((key) => {
        const regexp = new RegExp(key.replace(/\*/g, '.*'))
        return result.match(regexp)
      })
    result = SYNONIMS[synonim] || result
  }
  return LANGS.indexOf(result) !== -1 ? result : null
}
