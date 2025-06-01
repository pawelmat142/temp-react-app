import React, { createContext, useContext, useState, useEffect } from "react";
import fs from "../services/firebase";
import { User as FirebaseUser } from "firebase/auth";
import UserService, { User } from "../services/user.service";

interface UserContextType {
    firebaseUser: FirebaseUser | null
    user?: User | null
    loading: boolean;
}

const UserContext = createContext<UserContextType>({ 
    user: null,
    firebaseUser: null,
    loading: true
 });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUserDoc: (() => void) | undefined;

    const unsubscribe = fs.onAuthChanged((u) => {
      setFirebaseUser(u);
      if (u?.uid) {
        unsubscribeUserDoc?.(); // Odsubskrybuj poprzedni listener jeśli był
        unsubscribeUserDoc = UserService.listenByUid(u.uid, setUser);
      } else {
        setUser(null);
        setFirebaseUser(null);
        unsubscribeUserDoc?.();
        unsubscribeUserDoc = undefined;
      }
      console.warn("User changed:", u);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      unsubscribeUserDoc?.();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, firebaseUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);