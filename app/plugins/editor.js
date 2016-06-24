import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

//TODO: make configurable
const PROJECTS_PATH = '/Users/KELiON/projects';

/**
 * Plugin to open directory in editor
 * @param  {String} term
 */
const editorPlugin = (term, callback) => {
  const match = term.match(/^e\s(.*)/)
  if (match) {
    fs.readdir(PROJECTS_PATH, (err, items) => {
      let result = fuzzySearch(items, match[1]).map(file => {
        const path = [PROJECTS_PATH, file].join('/');
        return {
          id: path,
          term: `e ${file}`,
          title: file,
          subtitle: `Open ${path} in editor`,
          onSelect: shellCommand.bind(null, `e ${path}`),
        };
      });
      callback(term, result);
    });
  }
}

export default {
  name: 'Open in editor',
  keyword: 'e',
  fn: editorPlugin,
}
