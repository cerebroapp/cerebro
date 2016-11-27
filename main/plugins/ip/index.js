import shellCommand from 'lib/shellCommand';
import icon from './icon.png';

const LOCAL_IP_CMD = 'ipconfig getifaddr en0';
const EXTERNAL_IP_CMD = 'curl --silent http://icanhazip.com';

/**
 * Plugin to look and display local and external IPs
 *
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const ipPlugin = ({term, display}) => {
  if (term.match(/^ip\s?$/i)) {
    shellCommand(LOCAL_IP_CMD).then(local => {
      display({
        icon,
        id: 'local-ip',
        title: `Local IP: ${local}`,
        clipboard: local,
      });
    });
    shellCommand(EXTERNAL_IP_CMD).then(external => {
      display({
        icon,
        id: 'external-ip',
        title: `External IP: ${external}`,
        clipboard: external,
      });
    });
  }
};


export default {
  name: 'Show IP addresses',
  keyword: 'ip',
  fn: ipPlugin,
  icon,
};
