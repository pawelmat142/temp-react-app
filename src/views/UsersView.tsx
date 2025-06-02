import React from 'react';
import { useUserContext } from '../providers/UserProvider';
import PostListItem from '../components/PostListItem';

const UsersView: React.FC = () => {

  const { users } = useUserContext();

  return (
    <div className="post-list max-w-2xl mx-auto pb-20 px-5">
      <h2 className="mt-10 mb-10 text-center text-2xl/9 font-bold tracking-tight primary-text">
          Users
      </h2>
      {!users?.length ? (
        <p className="text-gray-600 dark:text-gray-300">No users found</p>
      ) : (
        <ul>
          {(users ?? []).map((user, idx) => (
            <PostListItem
                key={user.uid}
                content={user.email || ''}
                title={user.name}
                expanded={false}
                photoUrl={user.userInfo?.photoURL || ''}
                avatar={user.avatar}
            />
        ))}
        </ul>
      )}
    </div>
  );
};

export default UsersView;
