const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: задокументувати кожну функцію
async function listContacts() {
    // ...твій код. Повертає масив контактів.
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(data);
        return contacts;
    } catch (error) {
        throw error;
    }
}
  
async function getContactById(contactId) {
    try {
      const contacts = await listContacts();
      const contact = contacts.find((c) => c.id === contactId);
      return contact || null;
    } catch (error) {
      throw error;
    }
}

async function removeContact(contactId) {
    try {
      const contacts = await listContacts();
      const contactIndex = contacts.findIndex((c) => c.id === contactId);
  
      if (contactIndex === -1) {
        return null;
      }
  
      const removedContact = contacts.splice(contactIndex, 1)[0];
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return removedContact;
    } catch (error) {
      throw error;
    }
}
  
async function addContact(name, email, phone) {
    try {
      const contacts = await listContacts();
      const newContact = {
        id: Date.now().toString(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    } catch (error) {
      throw error;
    }
}

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};