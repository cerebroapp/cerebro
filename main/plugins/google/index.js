import shellCommand from 'lib/shellCommand';
import icon from './icon.png';

const id = 'search-web';
const order = 1;

const googlePlugin = (term, callback) => {
  const url = `https://google.com/?q=${encodeURIComponent(term)}`;
  callback({
    id,
    icon,
    order,
    title: `Search web for ${term}`,
    onSelect: () => { shellCommand(`open ${url}`); },
  });
};

export default {
  fn: googlePlugin,
};
