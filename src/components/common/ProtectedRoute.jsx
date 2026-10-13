import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldAlert } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5 my-5">
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="container py-5 text-center">
        <div className="p-5 bg-white rounded-4 shadow-sm border mx-auto" style={{ maxWidth: '560px' }}>
          <ShieldAlert size={48} className="text-danger mb-3" />
          <h3 className="font-serif fw-bold text-dark mb-2">Access Restricted</h3>
          <p className="text-muted small mb-4">
            Your current role (<strong>{user.role}</strong>) does not have permission to view this section.
          </p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
