'use client'

import { auth, db } from "@/firebase";
import { subscriptions } from "@/utils";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
    const { children } = props;

    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(false);

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

    async function saveToFirebase(data) {
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            const res = await setDoc(userRef, {
                subscriptions: data
            }, { merge: true});
        } catch (err) {
            console.log(err.message);
        }
    } 

    async function handleAddSubscription(newSubscription) {
        // Remove this line if you add paywall and making money.
        if (userData.subscriptions.length > 30) { return; }

        // Modify the local state (global context)
        const newSubscriptions = [...userData.subscriptions, newSubscription];
        setUserData({subscriptions: newSubscriptions})

        // Write the changes to out firebase database (async)
        await saveToFirebase(newSubscriptions);
    }

    async function handleDeleteSubscription(index) {
        // DELETE the entry at that index.
        const newSubscriptions = userData.subscriptions.filter((val, valIndex) => {
            return valIndex != index;
        })

        setUserData({subscriptions: newSubscriptions});
        await saveToFirebase(newSubscriptions);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {
                setCurrentUser(user);

                if (!user) return {}
                setLoading(true);

                // We found a user and check the database
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);

                console.log('Fetching user data..');

                // let firebaseData = { subscriptions } // Default data
                let firebaseData = { subscriptions: []};
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