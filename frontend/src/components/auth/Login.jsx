import React, { useState } from 'react'
import AuthContext from './../../context/auth/authContext.js';
import AlertContext from './../../context/alerts/alertContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { setAlert } = alertContext;
    const { loginUser, clearErrors, error, isAuthenticated, loading, user } = authContext;
    
    // useEffect(() => {
    //     if (isAuthenticated) {
    //         console.log('user role is '+user.role);
    //     }
    //     console.log('==== login user effect ran =====');
    // }, [user?.role]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user.role);
            switch (user?.role) {
                case 'admin':
                    navigate('/adminHomee');
                    break;
                case 'manager':
                    navigate('/managerHome');
                    break;
                case 'supervisor':
                    navigate('/supervisorHome');
                    break;
            
                default:
                    navigate('/unauth');
                    break;
            }
        }

        if (error === 'Invalid Credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated])

    const [currentUser, setUser] = useState({
        email: '',
        password1: '',
    })

    const {  email, password1  } = currentUser;

    const onChange = e => setUser({ ...currentUser, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email==='' || password1==='') {
            setAlert('Please fill all fields', 'danger');
        } else {

            loginUser({
                email,
                password: password1
            });
        }
    }

    return (
        
        <div className="form-container">
            
            {loading && <h1>loading ....</h1> }
            {
                !loading &&
                <>
                    <h1>
                        Account <span className="text-success">Login</span>
                    </h1>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" name='email' value={email} onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name='password1' value={password1} onChange={onChange} />
                        </div>
                
                        <input type="submit" value='Login' className='btn btn-primary btn-block' />
                        {/* {loading && <h1>logging in ....</h1> } */}
                    </form>
                </>
            }
        </div>
    );
}

export default Login