import { collection, addDoc, Firestore } from "firebase/firestore";
import firestore from "./firestore";

export interface Post {
    createdByUid: string
    id: string
    tags?: string[]
    votes?: { uid: string, value: number, date: Date }[]
}

export class _PostService {

    private readonly firestore: Firestore = firestore

    constructor() {
        console.log("UserService initialized")
    }

    /**
     * Adds a new post to the Firestore database.
     * @param post The post object to be added.
     * @returns The ID of the newly created post document.
     */

    public addUser = async (user: Post): Promise<string> => {
        const docRef = await addDoc(collection(this.firestore, "users"), user);
        return docRef.id;
    }
}

const PostService = new _PostService()
export default PostService

