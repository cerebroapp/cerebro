const locale = require('electron').remote.app.getLocale() || 'en-US';
const [lang, country] = locale.split('-');

export {
  locale,
  lang,
  country
};
