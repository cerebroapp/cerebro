import fs from 'fs';
import search from '../lib/search';
import shellCommand from '../lib/shellCommand';

const APPS_PATH = '/Applications';

// TODO: preload and cache app icons
// TODO: get apps from subdirs
const appsPlugin = (term, callback) => {
  fs.readdir(APPS_PATH, (err, items) => {
    const result = search(items, term).filter(file =>
      file.match(/\.app$/)
    ).map(file => {
      const path = [APPS_PATH, file].join('/');
      const shellPath = path.replace(/ /g, '\\ ');
      const title = file.replace(/\.app$/, '');
      return {
        title,
        term: title,
        id: path,
        icon: path,
        subtitle: path,
        onSelect: shellCommand.bind(this, `open ${shellPath}`),
      };
    });
    callback(term, result);
  });
};

export default {
  fn: appsPlugin,
};
