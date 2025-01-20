import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import {
  ProfileContainer,
  UserInfo,
  EmailWarning,
  ButtonContainer,
  PostcardSection,
  PostcardGrid,
  Postcard,
  PostcardImage,
} from './SingleUser.styled';
import { DisapproveButton } from '../../shared/ActionButton';
import { useNavigate } from 'react-router-dom';

const SingleUser = () => {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(
    localStorage.getItem('userRole'),
  );
  const navigate = useNavigate();
  const [postcards, setPostcards] = useState<
    { imageLink: string; downloadLink: string }[]
  >([]);

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/users/${id}`,
        );
        alert('User deleted successfully.');
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to delete user.');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.id) {
      localStorage.setItem('userId', user.id);
    }

    const fetchUserById = async () => {
      const userId = id || localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await axios.get(
            `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/users/${userId}`,
          );
          setUserData(response.data);
          setUserRole(response.data.role);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data.');
        }
      } else {
        setError('User not authenticated.');
      }
    };

    const fetchUserPostcards = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_TRAVEL_TALES_API}/api/s3/postcards/${id}`,
        );
        setPostcards(response.data);
      } catch (error) {
        console.error('Error fetching user postcards:', error);
        setError('Failed to fetch user postcards.');
      }
    };

    fetchUserById();
    fetchUserPostcards();
  }, [isAuthenticated, id, user?.id]);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <UserInfo>
        <h1>{userData.userName.toUpperCase()}'s Profile</h1>
        <p>Email: {userData.email}</p>
        <p>
          {userData.firstName} {userData.lastName}
        </p>
        {userData.emailVerified === false && (
          <EmailWarning>Email not verified</EmailWarning>
        )}
      </UserInfo>
      {/* {userRole === 'admin' && ( */}
      <ButtonContainer>
        <DisapproveButton
          onClick={async () => {
            await handleDeleteUser();
            navigate('/users-review');
          }}
        >
          Delete User
        </DisapproveButton>
      </ButtonContainer>
      {/* // )} */}
      <PostcardSection>
        <h2>User's Postcards</h2>
        <PostcardGrid>
          {postcards.length &&
            postcards.map((postcard, index) => (
              <Postcard key={index}>
                <a href={postcard.downloadLink} target='_blank'>
                  <PostcardImage
                    src={postcard.imageLink}
                    alt={`Postcard ${index}`}
                  />
                </a>
              </Postcard>
            ))}
        </PostcardGrid>
      </PostcardSection>
    </ProfileContainer>
  );
};

export default SingleUser;
