'use client'

import { auth, db } from "@/firebase";
import { subscriptions } from "@/utils";
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

    async function handleAddSubscription(newSubscription) {
        // Modify the local state (global context)
        const newSubscriptions = [...userData.subscriptions, newSubscription];
        setUserData({subscriptions: newSubscriptions})

        // Write the changes to out firebase database (async)
        
    }

    async function handleDeleteSubscription(index) {
        // DELETE the entry at that index.
        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex != index;
        })

        setUserData({subscriptions: newSubscriptions});
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

                let firebaseData = { subscriptions } // Default data
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
        currentUser, userData, loading, signup, login, logout,
        handleAddSubscription, handleDeleteSubscription
    }

    return (
        <AuthContext.Provider value={value}>
            { children }
        </AuthContext.Provider>
    )
}