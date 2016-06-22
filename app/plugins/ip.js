import React from 'react';
import shellCommand from '../lib/shellCommand';

const LOCAL_IP_CMD = "ipconfig getifaddr en0";
const EXTERNAL_IP_CMD = "curl --silent http://icanhazip.com";

/**
 * Plugin to look and display local and external IPs
 * @param  {String} term
 */
export default (term, callback) => {
  if (term.toLowerCase() === 'ip') {
    shellCommand(LOCAL_IP_CMD).then(local => {
      callback(term, {
        id: 'local-ip',
        title: `Local IP: ${local}`,
        clipboard: local,
      });
    });
    shellCommand(EXTERNAL_IP_CMD).then(external => {
      callback(term, {
        id: 'external-ip',
        title: `External IP: ${external}`,
        clipboard: external
      });
    });
  }
}
