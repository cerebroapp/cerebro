import React from 'react';
import Settings from './Settings';

/**
 * Plugin to show app settings in results list
 * @param  {String} term
 */
const settingsPlugin = (term, callback) => {
  if (!term.match(/^(show\s+)?(settings|preferences)\s*/i)) return;
  callback([{
    icon: '/Applications/Cerebro.app',
    title: 'Cerebro settings',
    id: `settings`,
    getPreview: () => <Settings />
  }]);
};

export default {
  name: 'Cerebro settings',
  icon: '/Applications/Cerebro.app',
  keyword: 'Settings',
  fn: settingsPlugin
};
