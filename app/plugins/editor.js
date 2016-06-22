import React from 'react';
import fs from 'fs';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const PROJECTS_PATH = '/Users/KELiON/projects';

/**
 * Plugin to open directory in editor
 * @param  {String} term
 */
export default (term, callback) => {
  const match = term.match(/^e\s(.*)/)
  if (match) {
    fs.readdir(PROJECTS_PATH, (err, items) => {
      let result = fuzzySearch(items, match[1]).map(file => {
        const path = [PROJECTS_PATH, file].join('/ ');
        return {
          id: path,
          title: file,
          subtitle: `Open ${path} in editor`,
          onSelect: shellCommand.bind(this, `e ${path}`),
        };
      });
      callback(term, result);
    });
  }
}
