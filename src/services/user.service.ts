import { collection, addDoc, Firestore, getDocs, query, where, doc, updateDoc, onSnapshot } from "firebase/firestore";
import firestore from "./firestore";
import { UserCredential, UserInfo } from "firebase/auth";
import fs from "./firebase";
import { toast } from "react-toastify";

export interface User {
    uid: string
    name: string
    email?: string
    displayName?: string
    provider?: 'google' | 'github' | 'email'
    settings?: UserSettings,
    userInfo?: UserInfo
}

export interface UserSettings {
    visibleByStrangers?: boolean
}

export class _UserService {

    private readonly firestore: Firestore = firestore

    private readonly COLLECTION_NAME = "users";

    constructor() {
        console.log("UserService initialized")
    }

    public handleGoogleRegister = async () => {
        try {
            const userCredential: UserCredential = await fs.registerWithGoogle();
            await this.register(userCredential)
            toast.success('Registered with Google!');
        } catch (err: any) {
            toast.error('Google registration failed.');
            console.error('Google registration error:', err);
        }
    };

    public handleGitHubRegister = async () => {
        try {
            const userCredential: UserCredential = await fs.registerWithGitHub();
            await this.register(userCredential)
            toast.success('Registered with GitHub!');
        } catch (err: any) {
            toast.error('GitHub registration failed.');
            console.error('GitHub registration error:', err);
        }
    };

    public handleEmailRegister = async (email: string, password: string, name: string) => {
        try {
            const userCredential: UserCredential = await fs.registerUser(email, password);
            await this.register(userCredential, 'email', name);
            toast.success('Registered with Email!');
        } catch (err: any) {
            toast.error('Email registration failed.');
            console.error('Email registration error:', err);
        }
    }

    private async register(userCredential: UserCredential, provider?: 'google' | 'github' | 'email', name?: string): Promise<string> {
        const user: User = {
            uid: userCredential.user.uid,
            name: name || userCredential.user.displayName || '',
            email: userCredential.user.email || '',
            displayName: name || userCredential.user.displayName || '',
            provider: provider,
            settings: {},
            userInfo: {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                displayName: userCredential.user.displayName,
                photoURL: userCredential.user.photoURL,
                phoneNumber: userCredential.user.phoneNumber,
                providerId: userCredential.user.providerId
            }
        }
        const uid = await this.addUser(user);
        console.warn("Registered user with UID:", uid);
        return uid;
    }

    private addUser = async (user: User): Promise<string> => {
        const docRef = await addDoc(collection(this.firestore, this.COLLECTION_NAME), user);
        return docRef.id;
    }

    public getByUid = async (uid: string): Promise<User | null> => {
        const usersRef = collection(this.firestore, "users");
        const q = query(usersRef, where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            return null;
        }
        const doc = querySnapshot.docs[0];
        return doc.data() as User;
    }

    public updateSettings = async (uid: string, settings: UserSettings) => {
        try {
            const usersRef = collection(this.firestore, this.COLLECTION_NAME);
            const q = query(usersRef, where("uid", "==", uid));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                throw new Error("User not found");
            }
            const docRef = doc(this.firestore, this.COLLECTION_NAME, querySnapshot.docs[0].id);
            await updateDoc(docRef, { settings });
            toast.success('Ustawienia zostały zapisane.');
        } catch (err: any) {
            toast.error('Błąd zapisu ustawień.');
            console.error('Update settings error:', err);
        }
    }

    /**
     * Nasłuchuje na zmiany dokumentu użytkownika o podanym UID.
     * @param uid UID użytkownika
     * @param callback Funkcja wywoływana przy każdej zmianie (lub usunięciu) dokumentu użytkownika
     * @returns Funkcja do odsubskrybowania nasłuchiwania
     */
    public listenByUid = (uid: string, callback: (user: User | null) => void): (() => void) => {
        const usersRef = collection(this.firestore, this.COLLECTION_NAME);
        const q = query(usersRef, where("uid", "==", uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (querySnapshot.empty) {
                callback(null);
            } else {
                const doc = querySnapshot.docs[0];
                callback(doc.data() as User);
            }
        });
        return unsubscribe;
    }

}

const UserService = new _UserService()
export default UserService

