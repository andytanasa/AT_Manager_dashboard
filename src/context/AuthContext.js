import React, { useContext, useState, useEffect } from "react";
import firebase, { auth } from "../firebase";

const AuthContext = React.createContext();
let userDocRef;
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, docRef) => {
    userDocRef = docRef;
    try {
      return await auth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") {
        throw new Error("Email already used!");
      }
    }
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password).then((obj) => {
      const db = firebase.firestore();
      const usersRef = db.collection("users");
      return usersRef
        .where("email", "==", email)
        .get()
        .then((obj) => {
          if (obj.docs.length > 0) {
            const currentUser = obj.docs[0].data();
            currentUser.id = obj.docs[0].id;
            setCurrentUser(currentUser);
            return obj.docs[0].data();
          } else {
            throw new Error("User not found!");
          }
        });
    });
  };
  const logout = () => {
    setCurrentUser(null);
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (userDocRef) {
        setCurrentUser((await userDocRef.get()).data());
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateUser = (user) => {
    setCurrentUser(user);
  };

  const value = {
    currentUser,
    updateUser,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
