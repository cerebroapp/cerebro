import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';

const APPS_PATH = '/Applications';

function openApp(app) {
  require("child_process").exec(`open ${app}`);
}

export default (term) => {
  return new Promise((resolve, reject) => {
    fs.readdir(APPS_PATH, (err, items) => {
      const result = fuzzySearch(items, term).map(file => {
        const path = [APPS_PATH, file].join('/');
        return {
          id: path,
          title: file.replace(/\.app$/, ''),
          subtitle: path,
          onSelect: openApp.bind(this, path),
        }
      });
      resolve(result);
    });
  });
}
