import React from 'react';
import { Outlet } from 'react-router-dom';

function PanelView() {
  return (
    <div className='w-full h-screen'>
      <Outlet />
    </div>
  );
};

export default PanelView;