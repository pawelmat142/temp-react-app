import React, { useState } from 'react';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import { useNavigate } from 'react-router-dom';
import { Path } from '../utils/path';
import PostListItem from '../components/PostListItem';
import { usePostsContext } from '../providers/PostsProvider';

const PostList: React.FC = () => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const navigate = useNavigate();

    const { posts, loading } = usePostsContext();

    return (
        loading ? (
            <div className="flex justify-center items-center py-10">
                <svg className="animate-spin h-8 w-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
            </div>
        ) : (
            <div className="post-list max-w-2xl mx-auto pb-20">
                <h2 className="mt-10 mb-10 text-center text-2xl/9 font-bold tracking-tight primary-text">
                    Posts
                </h2>
                <ul>
                {(posts ?? []).map((post, idx) => (
                    <PostListItem
                        key={post.id}
                        post={post}
                        expanded={expandedIndex === idx}
                        onExpand={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
                    />
                ))}
                </ul>
                <div className="flex justify-center mt-6">
                    <PrimaryBtn fullWidth={false}  onClick={() => navigate(Path.ADD_POST)}>
                        Dodaj post
                    </PrimaryBtn>
                </div>
            </div>
        )
    );
};

export default PostList;
