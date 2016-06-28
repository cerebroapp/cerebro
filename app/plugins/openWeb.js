import shellCommand from '../lib/shellCommand';

const URL_REGEXP = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/

const openWebPlugin = function(term, callback) {
  const match = term.match(URL_REGEXP);
  if (match) {
    let url = term;
    if (!term.match(/^https?\/\//)) {
      url = `http://${url}`;
    }
    callback(term, {
      title: url,
      subtitle: 'Open url',
      onSelect: () => { shellCommand(`open ${url}`) },
    });
  }
}

export default {
  fn: openWebPlugin,
}
