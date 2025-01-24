import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedAdminRoute = () => {
  const { user } = useAuth();

  if (user?.role !== 'Admin') {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
