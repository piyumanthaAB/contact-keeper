import React,{useContext, useState,useEffect} from 'react'
import AlertContext from './../../context/alerts/alertContext';
import AuthContext from '../../context/auth/authContext';

import {  useNavigate } from 'react-router-dom';

const Register = (props) => {

    const navigate = useNavigate();

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register,clearErrors,error,isAuthenticated } = authContext;

    useEffect(() => {

        // if user is authenticated he is being redirected to homae page
        if (isAuthenticated) {
            navigate('/');
        }

        if (error === 'User already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }

        console.log({'history':props.history,'navigate':navigate});

    }, [error,isAuthenticated]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const { name, email, password1, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();


        if (name === '' || email === '' || password1 === '') {
            // toast('Please fill all the fields', 'danger');
            setAlert('Please fill all the fields','danger');
        } else if (password1 != password2) {
            // toast('Passwords doesn\'t match', 'danger');
            setAlert('Passwords doesn\'t match','danger');
        } else {
            // console.log('register submitted', user);
            register({
                name, email, password:password1
            })
        }

    }

    return (
        <div className="form-container">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name' value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name='email' value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password1' value={password1} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Confirm Password</label>
                    <input type="password" name='password2' value={password2} onChange={onChange} />
                </div>
                <input type="submit" value='Register' className='btn btn-primary btn-block' />
            </form>
        </div>
    );
}

export default Register