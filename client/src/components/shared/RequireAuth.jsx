import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../shared/Loader';

const RequireAuth = () => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-dark-900"><Loader /></div>;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RequireAuth;
