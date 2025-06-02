import { Firestore, setDoc, doc, getDocs, collection } from "firebase/firestore";
import firestore from "./firestore";
import { Util } from "../utils/util";

export interface Post {
    createdByUid: string
    id: string
    tags?: string[]
    votes?: { uid: string, value: number, date: Date }[]
    title?: string
    content: string
    createdAt: Date // dodane pole
    avatar: Avatar
}

export interface Avatar {
    colorHex: string
    letterColorHex: string
    letter: string
}

export interface PostsCache {
    posts: Post[]
    date: Date
}

const LOCALSTORAGE_KEY = "posts"; 

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
        let posts = this.getFromLocalStorage()
        if (posts?.length) {
            return posts
        }
        await this.loadPostsFromFirestore()
        posts = this.getFromLocalStorage()
        return posts || []
    }

    public refreshPosts = async (): Promise<Post[]> => {
        await this.loadPostsFromFirestore()
        return this.getFromLocalStorage() || []
    }

    private loadPostsFromFirestore = async () => {
        const posts = await this.fetchPosts()
        const postsCache: PostsCache = {
            posts: posts,
            date: new Date(),
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(postsCache));
        console.warn("Posts loaded from Firestore:", postsCache);
    };

    private fetchPosts = async (): Promise<Post[]> => {
        console.warn("getPosts called")
        const querySnapshot = await getDocs(collection(firestore, "posts"));
        const postsArr: Post[] = [];
        querySnapshot.forEach(doc => {
            postsArr.push(doc.data() as Post);
        });
        return postsArr
    }

    private getFromLocalStorage = (): Post[] => {
        const postsString = localStorage.getItem(LOCALSTORAGE_KEY);
        let postsCache: PostsCache | null = null
        if (postsString) {
            try {
                postsCache = JSON.parse(postsString);
            } catch (e) {
                console.error("Error parsing posts from localStorage:", e);
                return []
            }
        }

        if (!postsCache?.date) {
            return []
        }
        const cacheDate = new Date(postsCache.date)

        if (Util.beforeToday(cacheDate)) {
            console.warn("Posts cache is older than today, returning empty array");
            return []
        }
        console.log("Posts from localStorage:", postsCache);
        return postsCache.posts || [];
    };
}

const PostService = new _PostService()
export default PostService

