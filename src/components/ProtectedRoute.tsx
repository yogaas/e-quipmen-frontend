import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

const ProtectedRoute = () => {
  const { access_token } = useSelector((state: RootState) => state.auth);

  // Jika tidak ada token, redirect ke login
  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  // Jika ada token, render child routes
  return <Outlet />;
};

export default ProtectedRoute;