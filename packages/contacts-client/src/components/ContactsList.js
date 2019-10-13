import React from 'react';
import './contactlist.css';

export const ContactsList = (props) => {
    const {contacts} = props;
  return(  <ul>
      {contacts && contacts.map(contact => {
        return (  <li key={contact.uuid}>
            {contact.name.first} {contact.name.last}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </li>);
      })}
        </ul>);
}
