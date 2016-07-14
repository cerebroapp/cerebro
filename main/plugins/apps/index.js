import React from 'react';

import fs from 'fs';
import getAppsList from 'lib/getAppsList';
import search from 'lib/search';
import shellCommand from 'lib/shellCommand';
import Preview from './Preview';

function getPreview(path, name) {
  return <Preview name={name} path={path} />;
}

// TODO: preload and cache app icons
// TODO: get apps from subdirs
const appsPlugin = (term,  callback) => {
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
        getPreview: () => getPreview(path, name)
      };
    });
    callback(result);
  });
};

export default {
  fn: appsPlugin,
};
