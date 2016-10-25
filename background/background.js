import { ipcRenderer } from 'electron';
import initializePlugins from './initializers/plugins';

function send(message) {
  ipcRenderer.send('message', message);
}

window.onload = function () {
  ipcRenderer.on('message', (event, payload) => {
    if (payload.type !== 'main.window.loaded') return;
    // Run plugin initializers only when main window is loaded
    initializePlugins(send);
  });
}
