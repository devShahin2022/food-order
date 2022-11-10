import React, { useContext } from 'react';
import { AuthContextInfo } from '../cotext/Authcontext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const PrivateRotes = ({children}) => {
    const {user, loading} = useContext(AuthContextInfo);
    const location = useLocation();
    if(loading){
        return <div style={{"height":"70vh"}} className='d-flex justify-content-center align-item-center w-100'>
            <Spinner animation="border" variant="dark" />
        </div>
    }
    if(user && user.uid){
        return children;
    }
    return <Navigate to='/login' state={{from : location }} replace></Navigate>
};

export default PrivateRotes;