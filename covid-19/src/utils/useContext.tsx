import React, { createContext , useState, useEffect, FC } from 'react';
import { auth } from '../auth/firebase.config';

interface ContextProps {
    currentUser: firebase.User | null;
    setCurrentUser: any;
    userId: string;
    verified: boolean
};
export const AuthProvider = createContext<Partial<ContextProps>>({});

export const AppContext = ({ children }: any) => {
    const [currentUser, setCurrentUser] = useState(null as firebase.User | null);
    const [userId, setUserId] = useState<string>('');
    const [verified, setVerified] = useState<boolean>();

    useEffect(() => {
        auth.onAuthStateChanged(setCurrentUser);
        auth.onAuthStateChanged((userAuth: any) => {
           setCurrentUser(userAuth);
           setUserId(userAuth.uid)
           setVerified(userAuth.emailVerified)
          });
    }, [])


    return (
        <AuthProvider.Provider value={{currentUser, setCurrentUser, userId, verified}} >
            {children}
        </AuthProvider.Provider>
    );
}