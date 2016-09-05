import { shell } from 'electron';

/**
 * Open browser with google search of term
 * @param  {String} term
 */
export default (term) => {
  const q = encodeURIComponent(term);
  shell.openExternal(`https://google.com/?q=${q}#newwindow=1&q=${q}`);
}
