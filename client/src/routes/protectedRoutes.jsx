import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingScreen from '@/common/loadingScreen';

function ProtectedRoutes({children}) {
  const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  console.log(user?.role, 'ProtectedRoutes user?.role');

  if(isAuthenticated && user?.role === 'frontend_user'){
    return (<Navigate to='/user/dashboard' />);
  }else if(isAuthenticated && (user?.role === 'user' || user?.role === 'admin')){
    return (<Navigate to='/admin/dashboard' />);
  }
  
  // by default
  return (
    <>
      {children}
    </>
  );
};

export default ProtectedRoutes;