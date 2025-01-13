import { useState, useEffect } from 'react';
import { UserList, UserItem, Title, RedActionButton, /*VerificationText,*/ EmailLink, SearchContainer, SearchInput, SearchButton } from './UsersReview.styled';
import { UserType } from '../../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UsersReview = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://3.74.155.131/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  );

  return (
    <>
      <Title>
        <h1>Travel Tales users</h1>
      </Title>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={() => console.log('Searching...')}>
          Search
        </SearchButton>
      </SearchContainer>
      <UserList>
        {filteredUsers.map((user: UserType) => (
          <UserItem key={user.username}>
            <EmailLink href={user.email ?? '#'}>
              {user.email ?? 'No email'}
            </EmailLink>
            {/* {user.emailConfirmed ? (
              <VerificationText>Email verified</VerificationText>
            ) : (
              <VerificationText>Email not verified</VerificationText>
            )} */}
            <RedActionButton onClick={() => navigate('/single-user-review')}>
              Review Profile
            </RedActionButton>
          </UserItem>
        ))}
      </UserList>
    </>
  );
};

export default UsersReview;
