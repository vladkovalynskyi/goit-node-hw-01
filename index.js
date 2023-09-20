// index.js
const argv = require('yargs').argv;
const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const allContacts = await contacts.listContacts();
        console.log('All contacts:', allContacts);
        break;

      case 'get':
        const contactById = await contacts.getContactById(id);
        console.log('Contact by ID:', contactById || 'Contact not found');
        break;

      case 'add':
        const newContact = await contacts.addContact(name, email, phone);
        console.log('Added contact:', newContact);
        break;

      case 'remove':
        const removedContact = await contacts.removeContact(id);
        console.log('Removed contact:', removedContact || 'Contact not found');
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

invokeAction(argv);
