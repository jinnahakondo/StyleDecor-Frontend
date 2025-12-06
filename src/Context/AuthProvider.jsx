import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContex';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.config';
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    // login with google 
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    // create user with email and password
    const createUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    //update userProfile
    const updateUserProfile = (updateInfo) => {
        setLoading(true);
        return updateProfile(updateInfo)
    }

    const authInfo = {
        user,
        googleLogin,
        createUser,
        updateUserProfile
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