const fs = require("fs").promises;
const path = require("path");


const contactsPath = path.join(__dirname, "./db/contacts.json");


// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data)
    return contacts
}
async function getContactById(contactId) {
    const contacts = await listContacts()
    const contactString = String(contactId)
    const contactById = contacts.find((contact) => contact.id === contactString) 
    if (!contactById) {
        return null
    }
    return contactById
}
async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIdToString = String(contactId);
  const index = contacts.findIndex((item) => item.id === contactIdToString);
  if (index === -1) {
    return null;
    }
    const [final] = contacts.splice(index, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return final;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = { name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };