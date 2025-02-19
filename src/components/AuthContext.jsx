import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth } from '../config/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoadingAuth(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ currentUser, logout }}>
            {!loadingAuth && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
