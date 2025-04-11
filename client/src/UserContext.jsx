import { createContext, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children}){
    const [user,setUser] = useState(null);
    const [ready,setReady] = useState(false);
    useEffect(() => {
        axios.get('/profile')
            .then(({ data }) => {
                setUser(data);
            })
            .catch((err) => {
                console.error('Failed to fetch profile:', err);
                setUser(null); // Optionally ensure user is cleared
            })
            .finally(() => {
                setReady(true); // ✅ Always run this
            });
    }, []);
    return (
        <UserContext.Provider value={{user,setUser,ready}}>
            {children}
        </UserContext.Provider>
    );
}