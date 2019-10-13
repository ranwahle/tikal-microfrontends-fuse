import React from 'react';

export const NewContact = (props) => {

    const {addContact} = props;
    const newContact = () => {
        const first = firstNameRef.current.value;
        const last = lastNameRef.current.value;
        const email = emailRef.current.value;
        addContact({name: {first, last}, email});
    }

    const firstNameRef = React.createRef();
    const lastNameRef = React.createRef();
    const emailRef = React.createRef();

    return (<>
        <div>
        <label>First name <input type="text" name="firstName" ref={firstNameRef}/></label>
        </div>
        <div>
            <label>Last name <input type="text" ref={lastNameRef}/></label>
        </div>
        <div>
            <label>Email<input type="email" ref={emailRef}/></label>

        </div>
        <button onClick={newContact}>New Contact</button>
    </>);
}
