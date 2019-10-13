import React from 'react';


export const ContactsList = (props) => {
  return(  <>
      {props.contacts && props.contacts.map(contact => {
        return   <div>
            {contact.name}
        </div>
      })}
        </>);
}
