import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {ContactsList} from "./components/ContactsList";
import {NewContact} from "./components/NewContact";
import {getContacts, addContact as createContact} from './contactsService';
function App() {


    const [contactsList, setContactsList] = useState([]);
    const [shownObject, setShownObject] = useState('contacts');
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
           setContactsList( contactsResponse);
        };

      useEffect(() => {
          fetchContacts();
      }, [() => false]);


  return (
    <div className="App">

        {shownObject === 'newContact' &&
            <>
        <a href="javascript:void(0)" onClick={() => setShownObject('contacts')}>Contacts</a>
        <NewContact addContact={addContact}/>
        </>}

        {shownObject === 'contacts' &&
            <>
                <a href="javascript:void(0)" onClick={() => setShownObject('newContact')}>New contact</a>

                <ContactsList contacts={contactsList} />
        </>}

    </div>
  );
}

export default App;
