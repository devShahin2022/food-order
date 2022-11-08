import React, { createContext} from 'react';


// create context
export const AuthContextInfo = createContext();


const AuthContext = ({children}) => {
    
    const data = "hello";
    const authInfo = {data};
    return (
        <AuthContextInfo.Provider value={authInfo}>
            {children}
        </AuthContextInfo.Provider>
    );
};

export default AuthContext;