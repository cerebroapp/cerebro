import React from 'react';
import search from 'lib/search';
import Settings from './Settings';

// Settings plugin name
const NAME = 'Cerebro Settings';

// Phrases that used to find settings plugins
const KEYWORDS = [
  NAME,
  'Cerebro Preferences'
];

/**
 * Plugin to show app settings in results list
 * @param  {String} term
 */
const settingsPlugin = (term, callback) => {
  const found = search(KEYWORDS, term).length > 0;
  if (found) {
    const results = [{
      icon: '/Applications/Cerebro.app',
      title: NAME,
      term: NAME,
      id: 'settings',
      getPreview: () => <Settings />
    }];
    callback(results);
  }
}

export default {
  name: NAME,
  fn: settingsPlugin
};
