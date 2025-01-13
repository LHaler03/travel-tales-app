import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SingleUser = () => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  console.log('User ID:', user?.id);

  useEffect(() => {
    const fetchUserById = async () => {
      if (isAuthenticated && user) {
        console.log('User ID:', user.id);
        try {
          const response = await axios.get(`http://3.74.155.131/api/users/${user.id}`);
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
  }, [isAuthenticated, user]);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userData.name}'s Profile</h1>
      <p>Email: {userData.email}</p>
      <p>Username: {userData.username}</p>
    </div>
  );
};

export default SingleUser;