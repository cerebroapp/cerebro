import { CURRENCY_BY_LANG, CURRENCY_BY_COUNTRY } from './constants';
import { get } from 'lib/config';
/**
 * Get base currency based on country and language
 * @return {String}
 */
export default () => (
  CURRENCY_BY_COUNTRY[get('country')]
    || CURRENCY_BY_LANG[get('lang')]
    || 'usd'
);
