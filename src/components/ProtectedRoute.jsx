// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate} from 'react-router-dom';
import useAuthStore from './auth/AuthStore';


const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useAuthStore();
  console.log("Is Authenticated:", isAuthenticated);

  return isAuthenticated ? children  : <Navigate to="/login" />;
};

export default ProtectedRoute;