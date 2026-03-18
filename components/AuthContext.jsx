'use client'

import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser(null);
        setUserData(null);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setLoading(true);
                setCurrentUser(user);

                if (!user) return {}

                // We found a user and check the database
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                console.log('Fetching user data..');

                let firebaseData = {subscriptions: []} // Default data
                if (docSnap.exists()) {
                    // Found data
                    firebaseData = docSnap.data();

                }

                setUserData(firebaseData)
                setLoading(false);

            } catch (err) {
                console.log(err.message);
            }
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser, userData, loading, signup, login, logout
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}