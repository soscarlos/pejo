import { createContext, useState } from "react";

const AuthorizationContext = createContext({});

export const AuthorizationProvider = ({ children }) => {
    const [authorization, setAuthorization] = useState({});

    return (
        <AuthorizationContext.Provider value={{ authorization, setAuthorization }}>
            {children}
        </AuthorizationContext.Provider>
    )
}

export default AuthorizationContext;