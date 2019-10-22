import React, {useEffect, useState} from 'react';
import './App.css';
import {ContactsList} from "./components/ContactsList";
import {NewContact} from "./components/NewContact";
import {addContact as createContact, getContacts} from './contactsService';
import {AppContext} from "microfronts";

function App() {


    const [contactsList, setContactsList] = useState([]);
    const [shownObject,     setShownObject] = useState('contacts');
    const addContact = async (contact) => {
        await createContact(contact);
        fetchContacts(true);
    }

    const fetchContacts = async (override) => {
        if (!override && contactsList.length) {
            return;
        }
        const contactsResponse = await getContacts();
        setShownObject('contacts')
        setContactsList(contactsResponse);
    };

    useEffect(() => {
        fetchContacts();
    }, [() => false]);


    return (
        <div className="App">

            {shownObject === 'newContact' &&
            <>
                <a  onClick={() => setShownObject('contacts')}>Contacts</a>
                <NewContact addContact={addContact}/>
            </>}

            {shownObject === 'contacts' &&
            <>
                <a onClick={() => setShownObject('newContact')}>New contact</a>

                <ContactsList contacts={contactsList}/>
            </>}

        </div>
    );
}
AppContext.provide('contacts.getById', async (uuid) => {
    const response = await fetch(`/contact/${uuid}`);
    const contact = await response.json();
    return contact;
})

AppContext.provide('contacts.getByEmail', async (email) => {
    const response = await fetch(`contact/email/${email}`);
    return await response.json();
})

AppContext.provide('contacts.getSelectedContact', () => {

})

export default App;
