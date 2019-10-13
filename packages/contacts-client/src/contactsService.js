const url = `http://localhost:3005/`;

export const getContacts = async () => {
    const response = await  fetch(`http://localhost:3005/contacts/`);
    const contactsResponse = await response.json();

    return contactsResponse;
};

export const addContact = async contact => {
    const result = await  fetch(`${url}contact/`, {method:'POST', headers: {
            'content-type': 'application/json'
        }, body: JSON.stringify(contact)});

    return result;
}
