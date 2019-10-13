import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {ContactsList} from "./components/ContactsList";
import {NewContact} from "./components/NewContact";
import {getContacts, addContact as createContact} from './contactsService';
function App() {


    const [contactsList, setContactsList] = useState([]);
    const addContact = async (contact) => {
        await createContact(contact);
      fetchContacts(true);
    }

        const fetchContacts = async (override?) => {
            if (!override && contactsList.length) {
                return;
            }
            const contactsResponse = await getContacts();
            console.log('contacts', contactsResponse);
           setContactsList( contactsResponse);
        };

      useEffect(() => {
          fetchContacts();
      }, [() => false]);
  return (
    <div className="App">

        <ContactsList contacts={contactsList} />
<NewContact addContact={addContact}/>

    </div>
  );
}

export default App;
