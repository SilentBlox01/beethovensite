
import React from 'react';
import { Navigate } from 'react-router-dom';

// Component deprecated and removed from routing.
// Redirects to home if accessed directly.
export const Guides: React.FC = () => {
  return <Navigate to="/" replace />;
};
