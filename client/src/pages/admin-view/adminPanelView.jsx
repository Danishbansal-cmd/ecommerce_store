import React from "react";
import AdminSidebar from "./adminSidebar";
import AdminNavigation from "./adminNavigation";
import { Outlet } from "react-router-dom";

function AdminPanelView({ userRole }) {
  return (
    <div className="w-full h-screen flex bg-backgroundMain-light">
      <AdminSidebar />

      <div className="flex-1 h-full flex flex-col">
        <AdminNavigation /> 

        {/* Content changes without refreshing Sidebar & Navigation */}
        <div className="p-5 flex-1 min-h-0 overflow-auto max-h-[calc(100vh-112px)]
          overflow-y-scroll
          [&::-webkit-scrollbar-track]:rounded-full 
          [&::-webkit-scrollbar-thumb]:rounded-full 
          [&::-webkit-scrollbar]:w-2 
          [&::-webkit-scrollbar-track]:bg-transparent 
          [&::-webkit-scrollbar-thumb]:bg-colorSecondary-light">
          <Outlet /> {/* ✅ This ensures pages like AdminDashboard are shown */}
        </div>
      </div>
    </div>
  );
}

export default AdminPanelView;
