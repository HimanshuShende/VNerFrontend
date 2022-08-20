import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

export const PrivateRoute = ({ children, ...rest }) => {
    let { user } = useContext(AuthContext);
    return <Route {...rest}> { user ? children : <Navigate to="/signin"/> } </Route>
    
}