import { app, ipcMain } from 'electron';

import createMainWindow from './main/createWindow';
import createBackgroundWindow from './background/createWindow';

let mainWindow;
let backgroundWindow;

app.on('ready', () => {
  mainWindow = createMainWindow(
    // Main window html
    `file://${__dirname}/main/app.html`,
    // Fullpath for menu bar icon
    `${__dirname}/tray_icon@2x.png`
  );
  backgroundWindow = createBackgroundWindow(`file://${__dirname}/background/index.html`);

  app.dock.hide();
});

ipcMain.on('message', (event, payload) => {
  const toWindow = event.sender === mainWindow.webContents ? backgroundWindow : mainWindow;
  toWindow.webContents.send('message', payload);
});

ipcMain.on('updateSettings', (event, key, value) => {
  mainWindow.settingsChanges.emit(key, value);
});
