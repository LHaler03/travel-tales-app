import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

const SingleUser = () => {
  const { user, isAuthenticated } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      if (isAuthenticated) {
        const userId = id || user?.id;
        try {
          const response = await axios.get(
            `http://localhost:5185/api/users/${userId}`,
          );
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setError('Failed to fetch user data.');
        }
      } else {
        setError('User not authenticated.');
      }
    };

    fetchUserById();
  }, [isAuthenticated, id, user?.id]);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.firstName}'s Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.userName}</p>
    </div>
  );
};

export default SingleUser;
