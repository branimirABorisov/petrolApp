import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";


export const AuthContext = createContext();


export function AuthContextProvider({ children }) {


    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const userData = Cookies.get('user');
        if (userData) {
            const decodedUserData = JSON.parse(userData)
            setUser(jwtDecode(decodedUserData));
        }

    }, [])

    useEffect(() => {
        
        if (token) {
            const decodedToken = jwtDecode(token);

            Cookies.set('user', JSON.stringify(token), { expires: 1 });
            if (decodedToken) {
                setUser(decodedToken);

            }
        }


    }, [token])

    function getToken (accessToken) {
        const token = sessionStorage.getItem(accessToken);
        setToken(token);
    }

    


    return (
        <AuthContext.Provider value={{user, getToken}}>
            {children}
        </AuthContext.Provider>
    );
}