// Get dict.py source code using webpack file-loader
import command from 'raw!./dict.py';
import shellCommand from '../../lib/shellCommand';

// Execution of python script is pretty slow so we need to cache results
const cache = {};

/**
 * Parse result of dict.py execution to proper structure
 *   ** word – defined
 * @param  {String} result Result of execution dict.py
 * @return {Object}
 */
function parseDictionary(stdout) {
  let definitions = stdout.split('▶');
  const word = definitions.shift();
  definitions = definitions.map(d => d.split('• '));
  return {
    word,
    definitions,
  };
}

/**
 * Get word definition
 * @param  {String} word
 * @return {Object}
 */
export default (word) => {
  const fromCache = cache[word];
  if (fromCache) {
    return Promise.resolve(fromCache);
  }
  return shellCommand(`python -c "${command}" ${word}`)
    .then(parseDictionary)
    .then(result => {
      cache[word] = result;
      return result;
    });
};
