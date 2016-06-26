import define from '../lib/define';

/**
 * Look up term in OSx dictionary
 * @param  {String} term
 */
const definePlugin = (term, callback) => {
  const match = term.match(/^def(?:ine)?\s(.+)/);
  if (match) {
    const word = match[1];
    // TODO: show results from dictionary right here
    callback(term, {
      id: `define${word}`,
      title: `Define ${word}`,
      onSelect: () => define(word),
    });
  }
};

export default {
  name: 'Define word',
  keyword: 'define',
  fn: definePlugin,
};
