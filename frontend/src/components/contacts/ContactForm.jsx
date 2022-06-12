import React from 'react'
import { useState,useContext,useEffect } from 'react';

import ContactContext from '../../context/contacts/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { current, addContact,clearCurrent,updateContact } = contactContext;
    
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }

    },[contactContext,current]);

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type } = contact;

    const onChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (current === null) {
            // method in contact context
            addContact(contact);
            
        } else {
            // method in contact context
            updateContact(contact);
            clearCurrent();
        }

        // reset the state of contact
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (

        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current?'Edit':'Add'} Contact</h2>
            <input type="text" placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type="email" placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type="text" placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value='personal' onChange={onChange} checked={type==='personal'} />Personal{' '}
            <input type="radio" name="type" value='professional' onChange={onChange} checked={type === 'professional'} />Professional
            <div>
                <input type="submit" value={current?'Update Contact':'Add Contact'} className='btn btn-primary btn-block' />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm