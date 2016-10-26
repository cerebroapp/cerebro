import React from 'react';
import Preview from './Preview';
import search from 'lib/search';
import initialize from './initialize';

/**
 * List of all contacts from osx address book
 * @type {Array}
 */
let addressBook = [];

/**
 * Get person full name
 *
 * @param  {String} options.firstName
 * @param  {String} options.lastName
 * @return {String}
 */
const fullName = ({firstName, lastName}) => {
  return [firstName, lastName].filter(name => !!name).join(' ');
}

/**
 * Contacts plugin
 *
 * @param  {String}   term
 * @param  {Function} callback
 */
const contactsPlugin = (term, callback) => {
  const result = search(addressBook, term, fullName).map(person => ({
    icon: '/Applications/Contacts.app',
    title: fullName(person),
    term: fullName(person),
    id: `contacts-${person.id}`,
    getPreview: () => <Preview {...person} />,
  }));
  callback(result);
};

export default {
  initialize,
  name: 'Contacts',
  fn: contactsPlugin,
  onMessage: (contacts) => {
    addressBook = contacts;
  }
};
