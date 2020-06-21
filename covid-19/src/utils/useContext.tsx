import React, { createContext , useState, useEffect, FC } from 'react';
import { auth } from '../config/firebase.config';

//  App context pros
interface ContextProps {
    currentUser: firebase.User | null;
    setCurrentUser: any;
    userId: string;
    verified: boolean
};

export const AuthProvider = createContext<Partial<ContextProps>>({});

export const AppContext = ({ children }: any) => {
    const [userId, setUserId] = useState<string>('');
    const [verified, setVerified] = useState<boolean>();

    useEffect(() => {
        auth.onAuthStateChanged((userAuth: any) => {
           setUserId(userAuth.uid)
           setVerified(userAuth.emailVerified)
          });
    }, [])


    return (
        <AuthProvider.Provider value={{ userId, verified}} >
            {children}
        </AuthProvider.Provider>
    );
}