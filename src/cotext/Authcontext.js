import React, { createContext} from 'react';


// create context
export const AuthContextInfo = createContext();


const AuthContext = ({children}) => {
    
    const user = "shahin alam";
    const authInfo = {user};
    return (
        <AuthContextInfo.Provider value={authInfo}>
            {children}
        </AuthContextInfo.Provider>
    );
};

export default AuthContext;