import React, { useState } from 'react';
import PostService, { Post } from '../services/post.service';
import PrimaryBtn from '../components/buttons/PrimaryBtn';
import LabeledInput from '../components/form/LabeledInput';
import LabeledTextarea from '../components/form/LabeledTextarea';
import { toast } from 'react-toastify';
import { useUserContext } from '../providers/UserProvider'; // zakładamy, że taki hook istnieje
import fs from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { usePostsContext } from '../providers/PostsProvider';
import { Path } from '../utils/path';
import { PostUtil } from '../utils/post.util';



const AddPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext(); // pobierz aktualnego usera
    const { refreshPosts } = usePostsContext();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!user?.uid) {
            toast.error('You must be logged in to add a post.');
            setLoading(false);
            return;
        }

        const post: Post = {
            createdByUid: user.uid,
            id: fs.generateId(),
            content: content,
            title: title,
            createdAt: new Date(),
            avatar: PostUtil.generateAvatar(title, content)
        };

        try {
            await PostService.addPost(post);
            await refreshPosts();
            toast.success('Post added successfully!');
            setTitle('');
            setContent('');
            navigate(Path.POSTS);
        } catch (err: any) {
            console.error('Failed to add post:', err);
            toast.error('Failed to add post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight primary-text">
                        Add New Post
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <LabeledTextarea
                            id="content"
                            label="Content"
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            required
                            rows={4}
                        />

                        <LabeledInput
                            id="title"
                            label="Title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            autoComplete="off"
                        />
                        <div>
                            <PrimaryBtn type="submit" className="mt-10 w-full" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Post'}
                            </PrimaryBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPost;
