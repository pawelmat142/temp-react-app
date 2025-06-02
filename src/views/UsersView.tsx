import React from 'react';
import { useUserContext } from '../providers/UserProvider';
import PostListItem from '../components/PostListItem';

const UsersView: React.FC = () => {

  const { users } = useUserContext();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 primary-text">Users</h1>
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
            />
        ))}
        </ul>
      )}
    </div>
  );
};

export default UsersView;
