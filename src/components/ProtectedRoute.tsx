import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { fetchMe, type User } from '../lib/user-auth';
import Spinner from './Spinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'admin' | 'speaker' | 'delegate'>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let active = true;
    async function checkAuth() {
      const u = await fetchMe();
      if (active) {
        setUser(u);
        setLoading(false);
      }
    }
    checkAuth();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    // Redirect to login, saving the original location they tried to access
    if (allowedRoles?.includes('admin')) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User is logged in but doesn't have permissions, redirect to home page
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
