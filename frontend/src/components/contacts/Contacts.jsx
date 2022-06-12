import React, { Fragment, useContext, useEffect } from 'react'

import ContactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';

import { TransitionGroup,CSSTransition } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {

    const contactContext = useContext(ContactContext);

    const { contacts,filtered,getContacts,loading } = contactContext; 

    useEffect(() => {
        getContacts();
    }, []);

    if (contacts!==null && contacts.length == 0 && !loading) {
        return (
            <h4>Please add a contact !</h4>
        )
    }

    return (
        <Fragment>
            {contacts !== null && !loading ? (<TransitionGroup>
                {filtered != null ? filtered.map(contact => {
                    return (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>
                            <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                }) : contacts.map(contact => {
                    return (
                        <CSSTransition key={contact.id} timeout={500} classNames='item'>

                            <ContactItem contact={contact} />
                        </CSSTransition>
                            
                    )
                })}
            </TransitionGroup>) : <Spinner />}
            
        </Fragment>
    );
}

export default Contacts;
