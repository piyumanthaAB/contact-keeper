import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contacts/contactContext';
import ContactFilter from '../contacts/ContactFilter';
import ContactForm from '../contacts/ContactForm';
import Contacts from '../contacts/Contacts';


const Home = () => {

  const authContext = useContext(AuthContext);

  // const { isAuthenticated } = authContext;
  const contactContext = useContext(ContactContext);

  const { contacts,getContacts} = contactContext;

  // each time page loads, user is loaded
  useEffect(() => {
    console.log('home page loaded');
    authContext.loadUser();
    getContacts();
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        <ContactFilter />
        <Contacts />
      </div>
    </div>
  )
}

export default Home;
