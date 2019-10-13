import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ContactsList} from "./components/ContactsList";

function App() {

    const token = `fqJBbqqwnNAxBWbFTmKLn`;

    const [contacts, setContacts] = useState([]);

        const getContacts = async () => {
            const response = await  fetch(`http://localhost:3005/contact/${token}`);
            const contactsResponse = await response.json();

           setContacts( contactsResponse);
        };

        getContacts();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

      </header>
        <ContactsList contacts={contacts} />

    </div>
  );
}

export default App;
