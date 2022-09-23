import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../../App';

const PrivateRoute = ({ children }) => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    return (loggedInUser.email ? children : <Navigate to="/login" />)

}

export default PrivateRoute;