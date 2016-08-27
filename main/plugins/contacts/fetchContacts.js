import { remote } from 'electron';
import loadAddressBook from './loadAddressBook';

/**
 * Fetching contacts from address book
 */
export default function* refreshContacts() {
  return yield loadAddressBook();
}
