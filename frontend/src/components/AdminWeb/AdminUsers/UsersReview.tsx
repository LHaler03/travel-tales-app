import React, { useState, useEffect } from 'react';
import { UserList, UserItem, ReviewButton } from './UsersReview.styled';
import { UserType } from '../../../context/AuthContext';
import axios from 'axios';

const UsersReview = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://3.74.155.131/api/account/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserList>
      {users.map((user: UserType) => (
        <UserItem key={user.username}>
          {user.username}
          <ReviewButton onClick={() => handleReview(user.username)}>Review Profile</ReviewButton>
        </UserItem>
      ))}
    </UserList>
  );
};

const handleReview = (username: string) => {
  console.log(`Reviewing profile for user: ${username}`);
};

export default UsersReview;
