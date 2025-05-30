import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, Unsubscribe, NextOrObserver, User, ErrorFn, CompleteFn } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJEKT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const fs = {
  app,
  auth,
  loginUser: (email: string, password: string): Promise<UserCredential> => signInWithEmailAndPassword(fs.auth, email, password),
  registerUser: (email: string, password: string): Promise<UserCredential> => createUserWithEmailAndPassword(fs.auth, email, password),
  onAuthChanged: (nextOrObserver: NextOrObserver<User>, error?: ErrorFn, completed?: CompleteFn): Unsubscribe => {
    return onAuthStateChanged(auth, nextOrObserver, error, completed)
  }
}


export default fs