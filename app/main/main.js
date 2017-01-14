import path from 'path';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Search from './containers/Search';
import './css/global.css'
import { initializePlugins } from 'lib/rpc/functions';
import { on } from 'lib/rpc/events';
import { updateTerm } from './actions/search';
import config from '../lib/config';

/**
 * Change current theme
 *
 * @param  {String} src Absolute path to new theme css file
 */
const changeTheme = (src) => {
  document.getElementById('cerebro-theme').href = src;
};

// Set theme from config
changeTheme(config.get('theme'));

// Render main container
render(
  <Provider store={store}>
    <Search />
  </Provider>,
  document.getElementById('root')
);

// Initialize plugins
initializePlugins();

// Handle `showTerm` rpc event and replace search term with payload
on('showTerm', (term) => {
  store.dispatch(updateTerm(term));
});

// Handle `updateTheme` rpc event and change current theme
on('updateTheme', changeTheme);

// Handle `reload` rpc event and reload window
on('reload', () => location.reload())
