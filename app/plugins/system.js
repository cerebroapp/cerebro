import React from 'react';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const COMMANDS = {
  'Screen Saver': 'open -a ScreenSaverEngine',
  'Lock': "/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend"
};

/**
 * Plugin for system commands, like lock, screen saver, etc.
 * @param  {String} term
 */
export default (term, callback) => {
  const commands = fuzzySearch(Object.keys(COMMANDS), term);
  if (commands.length > 0) {
    const result = commands.map((cmd) => {
      return {
        title: cmd,
        onSelect: () => shellCommand(COMMANDS[cmd])
      }
    });
    console.log(result);
    callback(term, result);
  }
}
