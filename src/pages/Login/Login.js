import React, { useContext } from 'react';
import { AuthContextInfo } from '../../cotext/Authcontext';

const Login = () => {
    const {data} = useContext(AuthContextInfo);

    console.log("auth check : ", data);
    return (
        <div>
            <h1>Iam login page</h1>
        </div>
    );
};

export default Login;