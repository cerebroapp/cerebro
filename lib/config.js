import { remote } from 'electron';

/**
 * Directory for application cache
 * @type {String}
 */
export const CACHE_DIR = remote.app.getPath('userData');

/**
 * User locale in format of country-LANGUAGE, i.e. ru-RU or en-US
 * @type {String}
 */
export const locale = require('electron').remote.app.getLocale() || 'en-US';

/**
 * Parsed country and language from locale
 */
export const [lang, country] = locale.split('-');
