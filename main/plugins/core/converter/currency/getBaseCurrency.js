import { CURRENCY_BY_LANG, CURRENCY_BY_COUNTRY } from './constants'
import config from 'lib/config'
/**
 * Get base currency based on country and language
 * @return {String}
 */
export default () => (
  CURRENCY_BY_COUNTRY[config.get('country')]
    || CURRENCY_BY_LANG[config.get('lang')]
    || 'usd'
)
