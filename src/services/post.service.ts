import { Firestore, setDoc, doc } from "firebase/firestore";
import firestore from "./firestore";

export interface Post {
    createdByUid: string
    id: string
    tags?: string[]
    votes?: { uid: string, value: number, date: Date }[]
    title?: string
    content: string
}

export class _PostService {

    private readonly firestore: Firestore = firestore

    constructor() {
        console.log("UserService initialized")
    }

    /**
     * Adds a new post with a specific ID to the "posts" collection in Firestore.
     * If a document with the same ID exists, it will be overwritten.
     * @param post The post object to be added.
     * @returns The ID of the post document.
     */
    public addPost = async (post: Post): Promise<string> => {
        await setDoc(doc(this.firestore, "posts", post.id), post);
        return post.id;
    }
}

const PostService = new _PostService()
export default PostService

