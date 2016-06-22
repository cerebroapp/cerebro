import React from 'react';
import fuzzySearch from '../lib/fuzzySearch';
import shellCommand from '../lib/shellCommand';

const COMMANDS = {
  'Shut Down': "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'",
  'Restart': "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'",
  'Logout': "osascript -e 'tell app \"System Events\" to log out'",
  'Sleep': "pmset sleepnow",
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
        term: cmd,
        onSelect: () => shellCommand(COMMANDS[cmd])
      }
    });
    callback(term, result);
  }
}
