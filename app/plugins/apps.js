import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const APPS_PATH = '/Applications';

//TODO: read icons
export default (term, callback) => {
  fs.readdir(APPS_PATH, (err, items) => {
    const result = fuzzySearch(items, term).filter(file =>
      file.match(/\.app$/)
    ).map(file => {
      const path = [APPS_PATH, file].join('/');
      const shellPath = path.replace(/ /g, '\\ ');
      return {
        id: path,
        title: file.replace(/\.app$/, ''),
        subtitle: path,
        onSelect: shellCommand.bind(this, `open ${shellPath}`),
      };
    });
    callback(term, result);
  });
}
