import initializeRpc from './rpc/initialize';
import { ipcRenderer } from 'electron';

window.onload = () => {
  initializeRpc();
};
