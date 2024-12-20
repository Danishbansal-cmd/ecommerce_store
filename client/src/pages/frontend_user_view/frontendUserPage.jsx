import NavigationBar from '@/common/navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

function FrontEndUserPage() {
  return (
    <div className='w-full h-screen'>
      <NavigationBar />
      <Outlet />
    </div>
  );
};

export default FrontEndUserPage;