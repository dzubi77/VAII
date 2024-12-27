import React from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRoute({ children, allowedRoles }) {
    const isLogged = true;
    if (!isLogged) {
        return <Navigate to='/login'/>;
    }

    
    if (!allowedRoles.includes(localStorage.getItem('role'))) {
        return <Navigate to='/unauthorized'/>;
    }
    
    return (
        <>
            <h1>This will be accessible only after login!</h1>
            {children}
        </>
    );
}