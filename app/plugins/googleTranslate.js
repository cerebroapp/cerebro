import shellCommand from '../lib/shellCommand';

const translatePlugin = (term, callback) => {
  const match = term.match(/^t\s(.+)/);
  if (match) {
    const query = match[1];
    const url = `https://translate.google.com/?text=${encodeURIComponent(query)}`;
    callback(term, {
      id: 'web-translate',
      title: `Translate ${query}`,
      onSelect: () => { shellCommand(`open ${url}`); },
    });
  }
};

export default {
  fn: translatePlugin,
};
