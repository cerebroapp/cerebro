/* eslint max-len: [0] */

import shellCommand from 'lib/shellCommand';
import pluginIcon from './icon.png';
import orderBy from 'lodash/orderBy';

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
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const killPlugin = ({term, display}) => {
  const match = term.match(REGEXP);
  if (match) {
    const searchProcessName = match[1];
    if (!searchProcessName) {
      return;
    }
    const regexp = new RegExp(`[^\/]*${searchProcessName}[^\/]*$`, 'i');
    shellCommand(LIST_CMD).then(result => {
      const list =result
        .split('\n')
        .filter(line => line.match(regexp))
        .map(str => {
          const [id, cpu, path] = parsePsResult(str);
          const icon = getIcon(path);
          const title = path.match(regexp)[0];
          return { id, title, cpu, path, icon };
        });
      const results = orderBy(list, ({cpu}) => -cpu)
        .map(({id, title, cpu, path, icon}) => ({
          title,
          id,
          icon,
          subtitle: `${cpu}% CPU @ ${path}`,
          onSelect: () => shellCommand(`kill -9 ${id}`)
        }));
      display(results);
    });
  }
};

export default {
  name: 'Kill process named',
  keyword: 'kill',
  icon: pluginIcon,
  fn: killPlugin,
};
