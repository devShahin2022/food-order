import React, { useContext } from 'react';
import { AuthContextInfo } from '../cotext/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRotes = ({children}) => {
    const {user, loading} = useContext(AuthContextInfo);
    const location = useLocation();
    if(loading){
        return <h1>data loading</h1>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{from : location }} replace></Navigate>
};

export default PrivateRotes;