import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Wrap any route element with <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
 *   <YourPage />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default ProtectedRoute;