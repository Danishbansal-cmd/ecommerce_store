import Footer from '@/components/frontend-user-view/footer';
import NavigationBar from '@/components/frontend-user-view/navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className='w-full h-screen'>
      <NavigationBar />
      <Footer />
      <Outlet />
    </div>
  );
};

export default Home;