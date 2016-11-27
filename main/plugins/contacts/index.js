import React from 'react';
import Preview from './Preview';
import search from 'lib/search';
import initializeAsync from './initialize';

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
 */
const fullName = ({firstName, lastName}) => {
  return [firstName, lastName].filter(name => !!name).join(' ');
}

/**
 * Contacts plugin
 *
 * @param  {[type]} options.term
 * @param  {[type]} options.display [description]
 */
const contactsPlugin = ({term, display, actions}) => {
  const result = search(addressBook, term, fullName).map(person => ({
    icon: '/Applications/Contacts.app',
    title: fullName(person),
    term: fullName(person),
    id: `contacts-${person.id}`,
    getPreview: () => <Preview {...person} copyToClipboard={actions.copyToClipboard} />,
  }));
  display(result);
};

export default {
  initializeAsync,
  name: 'Contacts',
  fn: contactsPlugin,
  onMessage: (contacts) => {
    addressBook = contacts;
  }
};
