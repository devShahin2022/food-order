import React, { useContext } from 'react';
import { AuthContextInfo } from '../cotext/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRotes = ({children}) => {
    const {user, loading} = useContext(AuthContextInfo);
    const location = useLocation();
    if(loading){
        return <Spinner animation="border" variant="dark" />
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{from : location }} replace></Navigate>
};

export default PrivateRotes;