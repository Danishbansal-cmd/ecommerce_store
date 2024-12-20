import React from 'react';
import AuthSideBar from '../../components/auth/authSidebar';
import { Outlet } from 'react-router-dom';

function AuthForm() {
  return (
  <div className='flex w-full min-h-screen'>
      <AuthSideBar />
      <Outlet />
    </div>
    )
};

export default AuthForm;