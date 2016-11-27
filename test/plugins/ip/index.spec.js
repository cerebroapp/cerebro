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
  const term = 'ip';

  it('shows local ip', (done) => {
    const display = (result) => {
      if (result.title === `Local IP: ${localIp}`) {
        done();
      }
    };
    ipPlugin.fn({ term, display });
  });

  it('shows global ip', (done) => {
    const display = (result) => {
      if (result.title === `External IP: ${globalIp}`) {
        done();
      }
    };
    ipPlugin.fn({ term, display });
  });
});
