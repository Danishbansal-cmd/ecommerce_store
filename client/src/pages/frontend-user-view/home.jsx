import Footer from '@/components/frontend-user-view/footer';
import FrontEndUserContent from '@/components/frontend-user-view/frontendusercontent';
import NavigationBar from '@/components/frontend-user-view/navigation';
import React from 'react';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className='w-full h-screen overflow-auto
              [&::-webkit-scrollbar-track]:rounded-full 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-colorSecondary-light'>
      <NavigationBar />
      <FrontEndUserContent />
      <Footer />
      {/* <Outlet /> */}
    </div>
  );
};

export default Home;