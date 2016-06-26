import shellCommand from './shellCommand';

/**
 * Show query in OSx dictionary
 * @param  {String} word
 */
export default (word) => shellCommand(`open dict://"${word}"`);
