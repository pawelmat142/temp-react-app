import React, { createContext, useContext, useState, useEffect } from "react";
import PostService, { Post, PostsCache } from "../services/post.service";
import { Util } from "../utils/util";

interface PostsContextType {
    posts: Post[] | null;
    loading: boolean;
    loadPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

const LOCALSTORAGE_KEY = "posts"; 

export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(false);

    const postService = PostService;

    const loadPostsFromFirestore = async () => {
        const posts = await postService.getPosts()
        const postsCache: PostsCache = {
            posts: posts,
            date: new Date(),
        };
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(postsCache));
        console.warn("Posts loaded from Firestore:", postsCache);
    };

    const initPosts = async () => {
        let posts = getFromLocalStorage()

        if (!posts.length) {
            loadPosts()
        } else {
            setPosts(posts);
        }
    }

    const loadPosts = async () => {
        setLoading(true);
        await loadPostsFromFirestore();
        const posts = getFromLocalStorage();
        setPosts(posts);
        setLoading(false);
    }

    const getFromLocalStorage = (): Post[] => {
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

    useEffect(() => {
        initPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, loading, loadPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePostsContext = () => {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error("usePosts must be used within a PostsProvider");
    return ctx;
};
