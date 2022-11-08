import React, { useContext } from 'react';
import { AuthContextInfo } from '../cotext/Authcontext';
import { Navigate } from 'react-router-dom';

const PrivateRotes = ({children}) => {
    const {user} = useContext(AuthContextInfo);
    console.log(user);
    if(user){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default PrivateRotes;