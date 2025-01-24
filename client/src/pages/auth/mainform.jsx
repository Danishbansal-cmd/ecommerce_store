import React from 'react';
import MainSideBar from '../../components/auth/mainSidebar';
import { Outlet } from 'react-router-dom';

function MainForm() {
  return (
  <div className='flex w-full h-full min-h-screen'>
      <MainSideBar />
      <Outlet />
    </div>
    )
};

export default MainForm;