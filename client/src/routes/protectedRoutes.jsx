import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoutes({children}) {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    console.log(user?.role, 'ProtectedRoutes user?.role');

    if(isAuthenticated && user?.role === 'frontend_user'){
      return (<Navigate to='/user/dashboard' />);
    }else if(isAuthenticated && (user?.role === 'user' || user?.role === 'admin')){
      return (<Navigate to='/panel/dashboard' />);
    }

    if(!isAuthenticated){
      return children;
    }
};

export default ProtectedRoutes;