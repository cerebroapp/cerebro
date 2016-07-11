/* eslint max-len: [0] */

import search from 'lib/search';
import shellCommand from 'lib/shellCommand';

const COMMANDS = {
  Restart: "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'",
  Logout: "osascript -e 'tell app \"System Events\" to log out'",
  Sleep: 'pmset sleepnow',
  Lock: '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend',
  'Shut Down': "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'",
  'Screen Saver': 'open -a ScreenSaverEngine',
};

/**
 * Plugin for system commands, like lock, screen saver, etc.
 * @param  {String} term
 */
const systemPlugin = (term, callback) => {
  const commands = search(Object.keys(COMMANDS), term);
  if (commands.length > 0) {
    const result = commands.map((cmd) => ({
      title: cmd,
      term: cmd,
      onSelect: () => shellCommand(COMMANDS[cmd])
    }));
    callback(result);
  }
};

export default {
  fn: systemPlugin,
};
