import shellCommand from '../lib/shellCommand';

const REGEXP = /kill\s(.*)/;
const LIST_CMD = 'ps -A -o pid -o %cpu -o comm | sed 1d';

/**
 * Parse line of ps command
 * @param {String} line of ps result
 * @return {Array} array of processId, processName and processPath
 */
function parsePsResult(str) {
  return str.match(/(\d+)\s+(\d+[\.|,]\d+)\s+(.*)/).slice(1);
}

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const killPlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    const searchProcessName = match[1];
    if (!searchProcessName) {
      return;
    }
    const regexp = new RegExp(`[^\/]*${searchProcessName}[^\/]*$`, 'i');
    shellCommand(LIST_CMD).then(result => {
      const results = result.split('\n').filter(line =>
        line.match(regexp)
      ).map((str) => {
        const [processId, processCpu, processPath] = parsePsResult(str);
        const processName = processPath.match(regexp)[0];
        return {
          title: processName,
          id: processId,
          subtitle: `${processCpu}% CPU @ ${processPath}`,
          onSelect: shellCommand.bind(null, `kill -9 ${processId}`)
        };
      });
      callback(term, results);
    });
  }
};

export default {
  name: 'Kill process named',
  keyword: 'kill',
  fn: killPlugin,
};
