import { remote } from 'electron';
import loadAddressBook from './loadAddressBook';

/**
 * Promise wrapper for loadAddressBook function
 * @return {Promise}
 */
function getContacts() {
  return new Promise(resolve => loadAddressBook(resolve))
}

/**
 * Fetching contacts from address book
 */
export default function* refreshContacts() {
  const contacts = yield getContacts();
  // Getting result from remote function call wraps everything to getters/setters
  // this hack is needed to have plain objects instead of objects
  // with getters/setters that are extremely slow
  return JSON.parse(JSON.stringify(contacts));
}
