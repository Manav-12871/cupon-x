import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase'; // Wait, let's make sure auth is exported from firebase.js

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sign up
    const signup = async (email, password, name) => {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        await userCredential.user.updateProfile({
            displayName: name
        });
        // Force an immediate state update so the name appears instantly upon creation
        setCurrentUser({ ...userCredential.user, displayName: name });
        return userCredential;
    };

    // Log in
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    };

    // Log out
    const logout = () => {
        return auth.signOut();
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
