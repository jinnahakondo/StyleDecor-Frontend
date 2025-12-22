import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContex';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    console.log(loading);

    // login with google 
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
            .finally(() => {
                setLoading(false)
            })
    }


    // create user with email and password
    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
            .finally(() => {
                setLoading(false)
            })
    }

    //sign in with email and password
    const signInUser = (email, pass) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass)
            .finally(() => {
                setLoading(false)
            })
    }

    //update userProfile
    const updateUserProfile = (updateInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateInfo)
            .finally(() => {
                setLoading(false)
            })
    }


    //signOUt
    const SignOUtUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    const authInfo = {
        user,
        googleLogin,
        createUser,
        signInUser,
        updateUserProfile,
        SignOUtUser,
        loading
    }

    //set observer
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe();
    }, [])

    return <AuthContext value={authInfo}>
        {children}
    </AuthContext>
};

export default AuthProvider;