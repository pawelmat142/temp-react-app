import { collection, addDoc, Firestore, getDocs, query, where } from "firebase/firestore";
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
    settings?: { [key: string]: string },
    userInfo?: UserInfo
}

export class _UserService {

    private readonly firestore: Firestore = firestore

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
        const docRef = await addDoc(collection(this.firestore, "users"), user);
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

}

const UserService = new _UserService()
export default UserService

