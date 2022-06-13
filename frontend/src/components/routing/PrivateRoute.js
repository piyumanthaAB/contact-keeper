import React, { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route,Navigate,Outlet } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'

const PrivateRoute = ({component:Component,...rest}) => {

    const authContext = useContext(AuthContext);
    const alertContext = useContext(AlertContext);

    const { isAuthenticated, loading, loadUser, user } = authContext;
    const { setAlert } = alertContext;

    useEffect(() => {
        loadUser();
    }, []);
    
    return (
        (isAuthenticated)? <Outlet /> : (!loading && <Navigate to='/login' />))
}

export default PrivateRoute