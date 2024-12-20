import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  console.log(location,'location');
  console.log(isAuthenticated,'isAuthenticated');
  console.log(user,'user');

  if (!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register')) ) {
    return <Navigate to="/login" />
  }

  if (isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register')) ) {
    if(user?.role === 'frontend_user'){
      console.log('went there');
      return <Navigate to='/products/dashboard' />
    }else {
      return <Navigate to="/panel/dashboard" />
    }
  }

  // if (isAuthenticated && (location.pathname.includes('/panel')) ) {
  //   if(user?.role === 'frontend_user'){
  //     return <Navigate to='/products/dashboard' />
  //   }
  // }

  // if (isAuthenticated && (location.pathname.includes('/products')) ) {
  //   if(user?.role !== 'frontend_user'){
  //     return <Navigate to='/panel/dashboard' />
  //   }
  // }

  return <>{children}</>;
};

export default CheckAuth;