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

// Paleta 12 kolorów pasujących do projektu (np. pastelowe/tailwindowe)
const AVATAR_COLORS = [
    '#f87171', // red-400
    '#fb923c', // orange-400
    '#fbbf24', // yellow-400
    '#34d399', // green-400
    '#38bdf8', // sky-400
    '#60a5fa', // blue-400
    '#a78bfa', // purple-400
    '#f472b6', // pink-400
    '#facc15', // amber-400
    '#4ade80', // emerald-400
    '#818cf8', // indigo-400
    '#c084fc', // violet-400
];

// Funkcja generująca avatar
function generateAvatar(title: string, content: string) {
    const letter = (title?.trim() ? title.trim()[0] : content?.trim()?.[0] || '').toUpperCase();
    // Prosty hash na podstawie tekstu, żeby kolor był deterministyczny dla danego posta
    let hash = 0;
    for (let i = 0; i < letter.length; i++) {
        hash = letter.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorHex = AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];

    // Wylicz kontrastujący kolor tekstu (czarny lub biały)
    function getContrastYIQ(hex: string) {
        // Usuwa # jeśli jest
        hex = hex.replace('#', '');
        // Zamienia na RGB
        const r = parseInt(hex.substr(0,2),16);
        const g = parseInt(hex.substr(2,2),16);
        const b = parseInt(hex.substr(4,2),16);
        // YIQ formula
        const yiq = ((r*299)+(g*587)+(b*114))/1000;
        return yiq >= 128 ? '#222' : '#fff';
    }
    const textColor = getContrastYIQ(colorHex);

    return { colorHex: colorHex, letterColorHex: textColor, letter };
}

const AddPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useUserContext(); // pobierz aktualnego usera
    const { loadPosts } = usePostsContext();
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
            avatar: generateAvatar(title, content)
        };

        try {
            await PostService.addPost(post);
            await loadPosts(); // odśwież posty po dodaniu
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
