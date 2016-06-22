import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const DIR_REGEXP = /^\/(.*\/)*(.*)/
const HOME_DIR_REGEXP = /^\~/;

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
export default (term, callback) => {
  let path = term;
  if (path.match(HOME_DIR_REGEXP)) {
    path = path.replace(HOME_DIR_REGEXP, `/Users/${process.env['USER']}`);
  }
  const match = path.match(DIR_REGEXP);
  if (match) {
    const dir = match[1] ? `/${match[1]}` : '/';
    const fileName = match[2];
    fs.readdir(dir, (err, items) => {
      if (fileName) {
        items = fuzzySearch(items, fileName);
      }
      const result = items.map(file => {
        const path = [dir, file].join('');
        return {
          id: path,
          title: file,
          subtitle: path,
          clipboard: path,
          term: path,
          onSelect: shellCommand.bind(this, `open ${path}`),
        };
      });
      callback(term, result);
    });
  }
}
