import shellCommand from 'lib/shellCommand';
import icon from './icon.png';

const id = 'web-translate';
const order = 3;

const translatePlugin = (term, callback) => {
  const url = `https://translate.google.com/?text=${encodeURIComponent(term)}`;
  callback({
    id,
    icon,
    order,
    title: `Translate ${term}`,
    onSelect: () => { shellCommand(`open ${url}`); },
  });
};

export default {
  fn: translatePlugin,
};
