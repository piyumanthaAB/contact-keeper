import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({allowedRoles}) => {
    const { isAuthenticated ,user,loadUser} = useAuth();
    const location = useLocation();

    console.log({ allowedRoles });

    console.log(user?.role);

    let roleAccessPermission = false;

    if (user) {
        roleAccessPermission = allowedRoles.includes(user.role);
    }
    console.log({roleAccessPermission});

    useEffect(() => {
        loadUser();
    }, [])

   

    return (

        isAuthenticated && roleAccessPermission
            ? <Outlet />
            : isAuthenticated
                ?<Navigate to='/unauth' state={{ from: location }} replace />
                :<Navigate to='/login' state={{ from: location }} replace />
                

        // (isAuthenticated && user?.role?.find(role => allowedRoles.includes(role)))
        //     ? <Outlet />
        //     : isAuthenticated
        //         ?<Navigate to='/unauth' state={{ from: location }} replace />
        //         :<Navigate to='/login' state={{ from: location }} replace />
                
    )
}

export default RequireAuth