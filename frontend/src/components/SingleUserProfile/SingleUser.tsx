import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const SingleUser = () => {
  const { user, isAuthenticated } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserById = async () => {
      if (isAuthenticated && user) {
        console.log('User ID:', user.id);
        try {
          const response = await axios.get(
            `http://localhost:5185/api/users/${user.id}`,
          );
          console.log(response);
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

  console.log('User ID:', user?.id);

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
