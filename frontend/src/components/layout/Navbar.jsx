import React,{Fragment, useState} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './../../context/auth/authContext';
import ContactContext from '../../context/contacts/contactContext';
import { useEffect } from 'react';


export const Navbar = ({ title, icon }) => {
    
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);

    const { isAuthenticated, user, logoutUser } = authContext;
    const { clearContacts } = contactContext;


    useEffect(() => {
        switch (user?.role) {
            case 'admin':
                setNavLinks(adminLinks);
                break;
            case 'manager':
                setNavLinks(managerLinks);
                break;
            case 'supervisor':
                setNavLinks(supervisorLinks);
                break;
        
            default:
                setNavLinks(guestLinks);
                break;
        }
    }, [isAuthenticated])

    const onLogout = () => {
        logoutUser();
        clearContacts();
    }

    const renderNavLinks = (user) => {

        console.log('Nav bar console : user role is :'+user?.role);

        switch (user?.role) {
            case 'admin':
                return adminLinks;
            case 'manager':
                return managerLinks;
            case 'supervisor':
                return supervisorLinks;
        
            default:
                return guestLinks;
        }
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name} <br /> {user?.role} </li>
            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/admin'>Admin</Link>
            </li>
            <li>
                <Link to='/manager'>Manager</Link>
            </li>
            <li>
                <Link to='/supervisor'>Supervisor</Link>
            </li>
            
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/about'>About</Link>
                </li>
                {/* <li>
                    <Link to='/admin'>Admin</Link>
                </li>
                <li>
                    <Link to='/manager'>Manager</Link>
                </li>
                <li>
                    <Link to='/supervisor'>Supervisor</Link>
                </li> */}
        </Fragment>
    );

    const adminLinks = (
        <Fragment>
            {/* <li>Hello {user && user.name} <br /> {user?.role} </li> */}
            <h1 className='nav-brand'>
                Hello {user && user.name} <br /> {user?.role}
            </h1>
            <li>
                <Link to='/'>Contacts</Link>
            </li>
            <li>
                <Link to='/addUser'>Add Users</Link>
            </li>
            <li>
                <Link to='/viewUsers'>View All Users</Link>
            </li>

            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    );
    const supervisorLinks = (
        <Fragment>
            {/* <li>Hello {user && user.name} <br /> {user?.role} </li> */}
            <h1 className='nav-brand'>
                Hello {user && user.name} <br /> {user?.role}
            </h1>
            <li>
                <Link to='/'>Contacts</Link>
            </li>
            <li>
                <Link to='/queries'>User Complaints</Link>
            </li>
            <li>
                <Link to='/suggestions'>User Suggestions</Link>
            </li>

            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    );

    const managerLinks = (
        <Fragment>
            {/* <li>Hello {user && user.name} <br /> {user?.role} </li> */}
            <h1 className='nav-brand'>
                Hello {user && user.name} <br /> {user?.role}
            </h1>
            <li>
                <Link to='/'>Contacts</Link>
            </li>
            <li>
                <Link to='/editUsers'>Edit Users</Link>
            </li>
            <li>
                <Link to='/deleteUsers'>Delete All Users</Link>
            </li>

            <li>
                <a href="#!" onClick={onLogout}>
                    <i className="fas fa-sign-out-alt">
                        <span className="hide-sm">Logout</span>
                    </i>
                </a>
            </li>
        </Fragment>
    );

    const [navLinks, setNavLinks] = useState(guestLinks);


    return (
        <div className="navbar bg-primary" >
            {/* <h1>
                <i className={icon} /> {title}
            </h1> */}
            <ul>
                {navLinks}
                {/* {isAuthenticated ? renderNavLinks() : guestLinks} */}
                {/* {user?.role === 'admin' ? adminLinks : guestLinks} */}
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

Navbar.defaultProps = {
    title: 'Contact - Keeper',
    icon:'fas fa-id-card-alt'
}