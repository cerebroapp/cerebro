import getAppsList from './getAppsList';
import search from '../../lib/search';
import shellCommand from '../../lib/shellCommand';

// TODO: preload and cache app icons
// TODO: get apps from subdirs
const appsPlugin = (term, callback) => {
  getAppsList().then(items => {
    const result = search(items, term, (file) => file.name).map(file => {
      const { path, name } = file;
      const shellPath = path.replace(/ /g, '\\ ');
      return {
        title: name,
        term: name,
        id: path,
        icon: path,
        subtitle: path,
        onSelect: shellCommand.bind(this, `open ${shellPath}`),
      };
    });
    callback(result);
  });
};

export default {
  fn: appsPlugin,
};
