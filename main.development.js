import { app, ipcMain } from 'electron';
import electronDebug from 'electron-debug';

import createMainWindow from './main/createWindow';
import createBackgroundWindow from './background/createWindow';

electronDebug({ showDevTools: true });

let mainWindow;
let backgroundWindow;

app.on('ready', () => {
  mainWindow = createMainWindow(`file://${__dirname}/main/app.html`);
  backgroundWindow = createBackgroundWindow(`file://${__dirname}/background/index.html`);

  app.dock.hide();
});

ipcMain.on('message', (event, payload) => {
  const toWindow = event.sender === mainWindow.webContents ? backgroundWindow : mainWindow;
  toWindow.webContents.send('message', payload);
});
