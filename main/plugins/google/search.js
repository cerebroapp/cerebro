import { shell } from 'electron';

/**
 * Open browser with google search of term
 * @param  {String} term
 */
export default (term) => {
  shell.openExternal(`https://google.com/?q=${encodeURIComponent(term)}`);
}
