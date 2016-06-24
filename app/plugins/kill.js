import React from 'react';
import shellCommand from '../lib/shellCommand';

const REGEXP = /kill\s(.*)/
const LIST_CMD = 'ps -A -o pid -o %cpu -o comm | sed 1d';

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
const killPlugin = (term, callback) => {
  const match = term.match(REGEXP);
  if (match) {
    const processName = match[1];
    if (!processName) {
      return;
    }
    const regexp = new RegExp(`[^\/]*${processName}[^\/]*$`, 'i');
    shellCommand(LIST_CMD).then(result => {
      const results = result.split('\n').filter(line =>
        line.match(regexp)
      ).map((str) => {
        console.log(str, str.match(/(\d+)\s+(\d+[\.|\,]\d+)\s+(.*)/));
        const [_, processId, processCpu, processPath] = str.match(/(\d+)\s+(\d+[\.|\,]\d+)\s+(.*)/);
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
}

export default {
  name: 'Kill process named',
  keyword: 'kill',
  fn: killPlugin,
}
