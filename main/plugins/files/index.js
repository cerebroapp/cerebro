import React from 'react';
import fs from 'fs';
import search from 'lib/search';
import shellCommand from 'lib/shellCommand';
import getPreview from './getPreview';
import { shell } from 'electron';

const DIR_REGEXP = /^\/(.*\/)*(.*)/;
const HOME_DIR_REGEXP = /^~/;

/**
 * Do not show some files in results, i.e. system files
 *
 * @param  {String} fileName
 * @return {Boolean}
 */
const ignoreFile = (fileName) => (
  fileName.match(/^\./)
);

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const filesPlugin = (term, callback) => {
  let path = term;
  if (path.match(HOME_DIR_REGEXP)) {
    path = path.replace(HOME_DIR_REGEXP, `/Users/${process.env.USER}`);
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
      const result = [];
      fileItems.forEach(file => {
        if (ignoreFile(file)) return;
        const filePath = [dir, file].join('');
        result.push({
          id: filePath,
          title: file,
          subtitle: filePath,
          clipboard: filePath,
          term: filePath,
          icon: filePath,
          onKeyDown: (event) => {
            if (event.metaKey && event.keyCode === 82) {
              shell.showItemInFolder(filePath);
              event.preventDefault();
            }
          },
          onSelect: shellCommand.bind(null, `open ${filePath}`),
          getPreview: getPreview.bind(null, filePath)
        });
      });
      callback(result);
    });
  }
};

export default {
  fn: filesPlugin,
};
