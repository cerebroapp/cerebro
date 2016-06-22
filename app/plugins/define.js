import define from '../lib/define';

const PROJECTS_PATH = '/Users/KELiON/projects';

/**
 * Look up term in OSx dictionary
 * @param  {String} term
 */
export default (term, callback) => {
  const match = term.match(/^def(?:ine)?\s(.+)/);
  if (match) {
    const word = match[1];
    // TODO: show results from dictionary right here
    callback(term, {
      id: `dictionary-${word}`,
      title: `Define ${word}`,
      onSelect: () => { define(word) },
    });
  }
}
