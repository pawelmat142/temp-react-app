import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, onAuthStateChanged, Unsubscribe, NextOrObserver, User, ErrorFn, CompleteFn } from "firebase/auth";
import app from "../firebase/config";

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