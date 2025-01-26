import React from 'react';
import AdminSidebar from './adminSidebar';
import AdminNavigation from './adminNavigation';

function AdminPanelView({ userRole }) {
  return (
    <div className='w-full h-screen flex bg-backgroundMain-light'>
      <AdminSidebar />
      <AdminNavigation />
    </div>
  );
};

export default AdminPanelView;