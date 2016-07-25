import { shell } from 'electron';

/**
 * Show query in OSx dictionary
 * @param  {String} word
 */
export default (word) => shell.openExternal(`dict://${word}`);
