import { Firestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
import firestore from "./firestore";

export interface Post {
    createdByUid: string
    id: string
    tags?: string[]
    votes?: { uid: string, value: number, date: Date }[]
    title?: string
    content: string
    createdAt: Date // dodane pole
    avatar: {
        colorHex: string
        letterColorHex: string
        letter: string
    }
}

export interface PostsCache {
    posts: Post[]
    date: Date
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
        // Dodaj pole createdAt jeśli nie istnieje
        const postWithDate = {
            ...post,
            createdAt: post.createdAt || new Date()
        };
        await setDoc(doc(this.firestore, "posts", post.id), postWithDate);
        return post.id;
    }

    public getPosts = async (): Promise<Post[]> => {
        console.warn("getPosts called")
        const querySnapshot = await getDocs(collection(firestore, "posts"));
        const postsArr: Post[] = [];
        querySnapshot.forEach(doc => {
            postsArr.push(doc.data() as Post);
        });
        return postsArr
    }
}

const PostService = new _PostService()
export default PostService

