/* eslint max-len: [0] */

import search from 'lib/search';
import shellCommand from 'lib/shellCommand';
import airdropCommand from 'raw!./run-airdrop';

// Load icons
import airdropIcon from './airdrop.png';
import icloudDriveIcon from './icloud_drive.png';

const COMMANDS = {
  Restart: {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrrst»'",
  },
  Logout: {
    command: "osascript -e 'tell app \"System Events\" to log out'",
  },
  Sleep: {
    command: 'pmset sleepnow',
  },
  Lock: {
    command: '/System/Library/CoreServices/Menu\\ Extras/User.menu/Contents/Resources/CGSession -suspend',
  },
  'Shut Down': {
    command: "osascript -e 'tell app \"loginwindow\" to «event aevtrsdn»'",
  },
  'Screen Saver': {
    command: 'open -a ScreenSaverEngine',
  },
  'Airdrop': {
    command: `osascript -e '${airdropCommand}'`,
    icon: airdropIcon,
    subtitle: 'Open Airdrop in Finder'
  },
  'iCloud Drive': {
    command: 'open /Users/KELiON/Library/Mobile\\ Documents/com\~apple\~CloudDocs',
    icon: icloudDriveIcon,
    subtitle: 'Open iCloud Drive in Finder'
  }
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
      subtitle: COMMANDS[cmd].subtitle,
      term: cmd,
      icon: COMMANDS[cmd].icon,
      onSelect: () => shellCommand(COMMANDS[cmd].command)
    }));
    callback(result);
  }
};

export default {
  fn: systemPlugin,
};
