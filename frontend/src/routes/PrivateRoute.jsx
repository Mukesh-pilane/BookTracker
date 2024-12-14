import React from 'react';
import { getToken } from "../utility";
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component }) => {
    const token = getToken();

    // If the token is not present, navigate to the login page
    if (!token) {
        return <Navigate to={"/login"} />;
    }
    return <Component />;
};

export default PrivateRoute;
