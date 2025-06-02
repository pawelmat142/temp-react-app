import React, { createContext, useContext, useState, useEffect } from "react";
import PostService, { Post } from "../services/post.service";

interface PostsContextType {
    posts: Post[] | null;
    loading: boolean;
    refreshPosts: () => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);


export const PostsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(false);

    const postService = PostService;

    const initPosts = async () => {
        setLoading(true)
        setPosts(await postService.getPosts())
        setLoading(false)
    }
    
    const refreshPosts = async () => {
        setLoading(true)
        setPosts(await postService.refreshPosts())
        setLoading(false)
    }
    

    useEffect(() => {
        initPosts();
    }, []);

    return (
        <PostsContext.Provider value={{ posts, loading, refreshPosts }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePostsContext = () => {
    const ctx = useContext(PostsContext);
    if (!ctx) throw new Error("usePosts must be used within a PostsProvider");
    return ctx;
};
