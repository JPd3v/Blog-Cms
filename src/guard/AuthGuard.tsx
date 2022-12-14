import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function AuthGuard() {
  const { userToken } = useAuth();

  return userToken ? <Outlet /> : <Navigate replace to="/" />;
}
