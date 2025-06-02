import React from 'react';
import { Avatar } from '../services/post.service';

interface AvatarItemProps {
    avatar?: Avatar
    photoUrl?: string
    className?: string
}

const AvatarItem: React.FC<AvatarItemProps> = ({ avatar, photoUrl, className }) => {
    let _className = "post-list-item-avatar object-cover"
    if (className) {
        _className += ` ${className}`
    }

    if (photoUrl) {
        return (
            <img
                src={photoUrl}
                alt={avatar?.letter || 'avatar'}
                className={_className}
                style={{
                    borderRadius: '50%',
                    backgroundColor: avatar?.colorHex ? avatar.colorHex : '#eee',
                }}
            />
        )
    }
    if (avatar) {
        return (
            <div
            className={_className}
            style={{
                backgroundColor: avatar?.colorHex ? avatar.colorHex : '#eee',
                color: avatar?.letterColorHex
            }}
        >
            {avatar?.letter}
        </div>
        )
    }
    return null
};

export default AvatarItem;
