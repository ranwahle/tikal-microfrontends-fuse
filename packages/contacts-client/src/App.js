import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {ContactsList} from "./components/ContactsList";

function App() {


    const [contactsList, setContactsList] = useState([]);

        const getContacts = async () => {
            if (contactsList.length) {
                return;
            }
            const response = await  fetch(`http://localhost:3005/contacts/`);
            const contactsResponse = await response.json();
            console.log('contacts', contactsResponse);
           setContactsList( contactsResponse);
        };

      useEffect(() => {
          getContacts();
      }, [() => false]);
  return (
    <div className="App">

        <ContactsList contacts={contactsList} />


    </div>
  );
}

export default App;
