import { useState, useEffect } from 'react';
import {
  UserList,
  UserItem,
  Title,
  RedActionButton,
  EmailLink,
  SearchContainer,
  SearchInput,
  SearchButton,
} from './UsersReview.styled';
import { UserType } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const UsersReview = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/users`,
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false,
  );

  const buttonText = windowWidth <= 600 ? 'Review' : 'Review Profile';

  return (
    <>
      <Title>Travel Tales users</Title>
      <SearchContainer>
        <SearchInput
          type='text'
          placeholder='Search Users...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={() => console.log('Searching...')}>
          Search
        </SearchButton>
      </SearchContainer>
      <UserList>
        {filteredUsers.map((user: UserType) => (
          <UserItem key={user.id}>
            <EmailLink href={user.email ?? '#'}>
              {user.email ?? 'No email'}
            </EmailLink>
            <RedActionButton
              onClick={() => navigate(`/admin-single-user-review/${user.id}`)}
            >
              {buttonText}
            </RedActionButton>
          </UserItem>
        ))}
      </UserList>
    </>
  );
};

export default UsersReview;
