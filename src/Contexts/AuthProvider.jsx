import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../public/firebase.init";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const provider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    setLoading(false);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(false);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const GoogleSignIn = () => {
    setLoading(false);
    return signInWithPopup(auth, provider);
  };
  const update = (name, url) => {
    setLoading(false);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };
  const signOutUser = () => {
    localStorage.removeItem("token");
    setLoading(false);
    return signOut(auth);
  };
  const userInfo = {
    createUser,
    signInUser,
    user,
    loading,
    signOutUser,
    update,
    GoogleSignIn,
  };

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User Has been Logged In", currentUser);
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const userData = { email: currentUser.email };
        axios
          .post("http://localhost:3000/jwt", userData)
          .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            console.log("JWT Token stored in localStorage");
          })
          .catch((error) => {
            console.log("Token fetch failed", error);
          });
      }
    });
    return () => {
      unSubcribe();
    };
  }, []);
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
