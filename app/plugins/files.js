import fs from 'fs';
import search from '../lib/search';
import shellCommand from '../lib/shellCommand';

const DIR_REGEXP = /^\/(.*\/)*(.*)/;
const HOME_DIR_REGEXP = /^~/;

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const filesPlugin = (term, callback) => {
  let path = term;
  if (path.match(HOME_DIR_REGEXP)) {
    path = path.replace(HOME_DIR_REGEXP, `/Users/${process.env.USER}/`);
  }
  const match = path.match(DIR_REGEXP);
  if (match) {
    const dir = match[1] ? `/${match[1]}` : '/';
    const fileName = match[2];
    fs.readdir(dir, (err, items) => {
      let fileItems = items;
      if (fileName) {
        fileItems = search(fileItems, fileName);
      }
      const result = fileItems.map(file => {
        const filePath = [dir, file].join('');
        return {
          id: filePath,
          title: file,
          subtitle: filePath,
          clipboard: filePath,
          term: filePath,
          onSelect: shellCommand.bind(null, `open ${path}`),
        };
      });
      callback(term, result);
    });
  }
};

export default {
  fn: filesPlugin,
};
