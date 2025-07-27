import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token || token !== 'admin-authenticated') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;