import shellCommand from '../../lib/shellCommand';
import pluginIcon from './icon.png';

const REGEXP = /kill\s(.*)/;
const LIST_CMD = 'ps -A -o pid -o %cpu -o comm | sed 1d';

const DEFAULT_ICON = '/System/Library/CoreServices/CoreTypes.bundle/Contents/Resources/ExecutableBinaryIcon.icns';

/**
 * Parse line of ps command
 * @param {String} line of ps result
 * @return {Array} array of processId, processName and processPath
 */
function parsePsResult(str) {
  return str.match(/(\d+)\s+(\d+[\.|,]\d+)\s+(.*)/).slice(1);
}

function getIcon(processPath) {
  const match = processPath.match(/^.*?\.app/);
  if (match) {
    return match[0];
  }
  // If no .app was found, use OS X's generic 'executable binary' icon.
  return DEFAULT_ICON;
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
        const icon = getIcon(processPath);
        const processName = processPath.match(regexp)[0];
        return {
          title: processName,
          id: processId,
          icon,
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
  icon: pluginIcon,
  fn: killPlugin,
};
