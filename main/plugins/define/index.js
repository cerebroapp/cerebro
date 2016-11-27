import React from 'react';
import Preview from './Preview';

const order = 12;

/**
 * Look up term in OSx dictionary
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const definePlugin = ({term, display}) => {
  display({
    order,
    id: `define${term}`,
    icon: '/Applications/Dictionary.app',
    title: `Define ${term}`,
    onSelect: () => shell.open(`dict://${term}`),
    getPreview: () => <Preview word={term} />,
    order,
  });
};

export default {
  fn: definePlugin,
};
