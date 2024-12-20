import PasswordResetSideBar from '@/components/reset-password/passwordResetSidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';

function ResetPasswordView() {
    return (
      <div className='flex w-full min-h-screen'>
          <PasswordResetSideBar />
          <Outlet />
        </div>
        );
};

export default ResetPasswordView;