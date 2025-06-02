import React, { createContext, useContext, useState, useEffect } from "react";
import fs from "../services/firebase";
import { User as FirebaseUser } from "firebase/auth";
import UserService from "../services/user.service";
import { User } from "../services/model/user";
import usersService from "../services/users.service";

interface UserContextType {
    firebaseUser: FirebaseUser | null
    user?: User | null
    loading: boolean;
    users?: User[]
}

const UserContext = createContext<UserContextType>({ 
    user: null,
    firebaseUser: null,
    loading: true,
 });


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  const initUsers = async () => {
    setLoading(true);
    console.log('Init users...')
    setUsers(await usersService.getUsers())
    setLoading(false);
  };

  useEffect(() => {
    initUsers();
    // eslint-disable-next-line
  }, []);

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
      console.warn("[UserProvider] User changed:", u);
      setLoading(false);
    });

    return () => {
      unsubscribe();
      unsubscribeUserDoc?.();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, loading, firebaseUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);