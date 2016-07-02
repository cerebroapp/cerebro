import shellCommand from '../lib/shellCommand';

const googlePlugin = (term, callback) => {
  const match = term.match(/^g\s(.+)/);
  if (match) {
    const query = match[1];
    const url = `https://google.com/?q=${encodeURIComponent(query)}`;
    callback(term, {
      id: 'search-web',
      title: `Search web for ${query}`,
      onSelect: () => { shellCommand(`open ${url}`); },
    });
  }
};

export default {
  fn: googlePlugin,
};
