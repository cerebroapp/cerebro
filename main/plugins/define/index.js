import define from 'lib/define';

const order = 2;

/**
 * Look up term in OSx dictionary
 * @param  {String} term
 */
const definePlugin = (term, callback) => {
  callback({
    order,
    id: `define${term}`,
    icon: '/Applications/Dictionary.app',
    title: `Define ${term}`,
    onSelect: () => define(term),
    order,
  });
};

export default {
  fn: definePlugin,
};
