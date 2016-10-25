import React from 'react';

import fs from 'fs';
import getAppsList from 'lib/getAppsList';
import search from 'lib/search';
import shellCommand from 'lib/shellCommand';
import Preview from './Preview';
import initialize from './initialize';
import { shell } from 'electron';
import { saveIcon } from '../../actions/icons';

import store from '../../store';

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
        onKeyDown: (event) => {
          if (event.metaKey && event.keyCode === 82) {
            // Show application in Finder by cmd+R shortcut
            shell.showItemInFolder(path);
            event.preventDefault();
          }
        },
        onSelect: () => shellCommand(`open ${shellPath}`),
        getPreview: () => <Preview name={name} path={path} />
      };
    });
    callback(result);
  });
};

export default {
  fn: appsPlugin,
  initialize: initialize,
  onMessage: (payload) => store.dispatch(saveIcon(payload)),
};
