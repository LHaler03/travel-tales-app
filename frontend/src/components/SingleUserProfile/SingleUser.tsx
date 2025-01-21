import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ProfileContainer,
  UserInfo,
  EmailWarning,
  ButtonContainer,
  PostcardSection,
  PostcardGrid,
  Postcard,
  PostcardImage,
  Modal,
  ModalImage,
  ModalButtons,
} from './SingleUser.styled';
import { DisapproveButton, ApproveButton } from '../../shared/ActionButton';

const SingleUser = () => {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [_, setUserRole] = useState<string | null>(
    localStorage.getItem('userRole'),
  );
  const [postcards, setPostcards] = useState<
    { imageLink: string; downloadLink: string }[]
  >([]);

  const [selectedPostcard, setSelectedPostcard] = useState<{
    imageLink: string;
    downloadLink: string;
  } | null>(null);

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
      <PostcardSection>
        <h2>User's Postcards</h2>
        <PostcardGrid>
          {postcards.length > 0 &&
            postcards.map((postcard, index) => (
              <Postcard key={index}>
                <PostcardImage
                  src={postcard.imageLink}
                  alt={`Postcard ${index}`}
                  onClick={() => setSelectedPostcard(postcard)}
                />
              </Postcard>
            ))}
        </PostcardGrid>
      </PostcardSection>

      {selectedPostcard && (
        <Modal onClick={() => setSelectedPostcard(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ textAlign: 'center' }}
          >
            <ModalImage
              src={selectedPostcard.imageLink}
              alt='Enlarged Postcard'
            />
            <a
              href={selectedPostcard.downloadLink}
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'none' }}
            >
              <ApproveButton>Download</ApproveButton>
            </a>
          </div>
        </Modal>
      )}
    </ProfileContainer>
  );
};

export default SingleUser;
