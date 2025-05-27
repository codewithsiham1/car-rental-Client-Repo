  import React, { useEffect, useState } from 'react';
import Authcontext from './Authcontext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase';
  
  const Authprovider = ({children}) => {
    const [user,setUser]=useState(null);
    const [loading,setloading]=useState(true);
    const googleProvider = new GoogleAuthProvider();
    const createuser=(email,password)=>{
      setloading(true)
       return createUserWithEmailAndPassword(auth,email,password)
    }
    const signInuser=(email,password)=>{
      setloading(true);
      return signInWithEmailAndPassword(auth,email,password)
    }
    const signout=()=>{
      setloading(true)
      return signOut(auth)
    }
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };
  const googleLogin = () => {
  setloading(true);
  return signInWithPopup(auth, googleProvider);
};
    useEffect(()=>{
       const unsubscribe= onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser);
            console.log('state captured',currentuser)
            setloading(false);
        });
        return()=>{
            unsubscribe();
        }
    },[])
    const authInfo={
          user,loading,createuser,signInuser,setloading,signout,updateUserProfile,googleLogin
    }
    return (
        <Authcontext.Provider value={authInfo}>
            {children}
        </Authcontext.Provider>
    );
  };
  
  export default Authprovider;