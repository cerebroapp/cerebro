import ipInjector from 'inject!../../../main/plugins/ip';

const localIp = '192.168.0.1';
const globalIp = '1.1.1.1';

const RESULTS = {
  'ipconfig getifaddr en0': localIp,
  'curl --silent http://icanhazip.com': globalIp,
};

const ipPlugin = ipInjector({
  'lib/shellCommand': (cmd) => Promise.resolve(RESULTS[cmd]),
});

describe('IP plugin', () => {
  it('shows local ip', (done) => {
    ipPlugin.fn('ip', (result) => {
      if (result.title === `Local IP: ${localIp}`) {
        done();
      }
    });
  });

  it('shows global ip', (done) => {
    ipPlugin.fn('ip', (result) => {
      if (result.title === `External IP: ${globalIp}`) {
        done();
      }
    });
  });
});
