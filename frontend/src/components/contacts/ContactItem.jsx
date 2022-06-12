import React, { useContext } from 'react'

import ContactContext from '../../context/contacts/contactContext';

const ContactItem = ({ contact }) => {

    const contactContext = useContext(ContactContext);
    
    const { _id, name, phone, email,type } = contact;

    const onDelete = () => {
        contactContext.deleteContact(_id);
        contactContext.clearCurrent();
    }

    const onEdit = () => {
        contactContext.setCurrent(contact);
    }

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span
                    style={{float:'right'}}
                    className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>

            <ul className="list">
                {email && (
                    <li>
                        <i className="fas fa-envelope-open">{ email}</i>
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fas fa-phone">{ phone}</i>
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    );
}

export default ContactItem