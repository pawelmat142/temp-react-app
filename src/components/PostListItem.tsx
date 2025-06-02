import React, { useRef, useLayoutEffect, useState } from 'react';
import { Avatar } from '../services/post.service';

function formatDate(date: any) {
    if (date && typeof date === 'object' && 'seconds' in date) {
        date = new Date(date.seconds * 1000);
    } else {
        date = new Date(date);
    }
    if (isNaN(date.getTime())) return '';
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

interface PostListItemProps {
    avatar?: Avatar
    title?: string
    content: string
    expanded: boolean;
    createdAt?: Date
    photoUrl?: string
    onExpand?: () => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ content, title, avatar, photoUrl, expanded, createdAt, onExpand }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState('0px');

    // Skracanie tekstu do 100 znaków lub do pierwszego \n
    const getShortContent = (content: string) => {
        const maxLen = 70;
        let short = content.split('\n')[0];
        if (short.length > maxLen) short = short.slice(0, maxLen);
        if (short.length < content.length) short = short.trimEnd() + '...';
        return short;
    };

    useLayoutEffect(() => {
        if (contentRef.current) {
            setMaxHeight(expanded ? contentRef.current.scrollHeight + 'px' : '0px');
        }
    }, [expanded]);

    return (
        <li
            className={`flex justify-between gap-x-6 py-5 post-list-item cursor-pointer`}
            onClick={onExpand}
        >
            <div className="flex min-w-0 gap-x-4">
                {
                    photoUrl ? (
                        <img
                            src={photoUrl}
                            alt={avatar?.letter || 'avatar'}
                            className="post-list-item-avatar object-cover"
                            style={{
                                borderRadius: '50%',
                                backgroundColor: avatar?.colorHex ? avatar.colorHex : '#eee',
                            }}
                        />
                    ) : (
                        <div
                            className="post-list-item-avatar"
                            style={{
                                backgroundColor: avatar?.colorHex ? avatar.colorHex : '#eee',
                                color: avatar?.letterColorHex
                            }}
                        >
                            {avatar?.letter}
                        </div>
                    )
                }
                <div className="min-w-0 flex-auto">
                    <p className="text-sm/6 font-semibold primary-text">{title}</p>
                    <div className={`post-list-item-short-content${expanded ? ' hidden' : ''}`}>
                        <p className="text-xs/5 secondary-text whitespace-pre-line">{getShortContent(content)}</p>
                    </div>
                    <div
                        ref={contentRef}
                        style={{
                            maxHeight,
                            overflow: 'hidden',
                            transition: 'max-height 0.3s cubic-bezier(0.4,0,0.2,1)',
                        }}
                    >
                        <p
                            className="mt-1 text-xs/5 secondary-text whitespace-pre-line"
                            style={{ margin: 0 }}
                        >
                            {content }
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm/6 primary-text">coś tam</p>
                {createdAt ? (
                    <p className="mt-1 text-xs/5 secondary-text">
                        Last seen{' '}
                        <time dateTime={createdAt?.toString()}>
                            {formatDate(createdAt)}
                        </time>
                    </p>
                ) : (
                    <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="size-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs/5 secondary-text">Online</p>
                    </div>
                )}
            </div>
        </li>
    );
};

export default PostListItem;
