import { ipcRenderer } from 'electron';
import * as initializers from './initializers';

function send(message) {
  ipcRenderer.send('message', message);
}

function handler(event, payload) {
  if (payload.type === 'main_window_loaded') {
    Object.keys(initializers).forEach(name => initializers[name](send));
  }
}

window.onload = function () {
  ipcRenderer.on('message', handler);
}
