import loadAddressBook from './loadAddressBook';

/**
 * Interval for updating contacts
 * @type {Integer}
 */
const INTERVAL = 30 * 60 * 1000;

/**
 * Initializer for contacts plugin. Load contacts list and updated it once in INTERVAL
 * @param  {Function} done Initialize callback
 */
export default function(done) {
  const update = () => {
    loadAddressBook().then(done);
    setTimeout(update, INTERVAL);
  }
  update();
}
