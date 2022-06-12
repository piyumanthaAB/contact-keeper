import React, { useEffect } from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { Route,Navigate,Outlet } from 'react-router-dom'

const PrivateRoute = ({component:Component,...rest}) => {

    const authContext = useContext(AuthContext);
    const { isAuthenticated, loading ,loadUser} = authContext;

    useEffect(() => {
        loadUser();
    },[])

    return (
        isAuthenticated ? <Outlet /> : (!loading && <Navigate to='/login' />))
}

export default PrivateRoute