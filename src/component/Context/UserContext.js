import React, { createContext, useState, useEffect } from "react";
import app1 from "../Login/FirebaseConfig/Firebase.config";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
initializeApp(app1);
const auth = getAuth();
export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setloading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setloading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setloading(true);
    toast("LogOut Sucessfull");
    setUser(null);
    return signOut(auth);
  };
  const updateName = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setloading(false);
      return unsubscribe();
    });
  }, []);
  const authInfo = {
    user,
    createUser,
    signIn,
    updateName,
    setUser,
    logOut,
    loading,
    googleSignIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
