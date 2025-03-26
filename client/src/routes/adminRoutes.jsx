import LoadingScreen from "@/common/loadingScreen";
import PanelDashboard from "@/components/panel-view/dashboard";
import AdminDashboard from "@/pages/admin-view/adminDashboard";
import AdminItemsAddNew from "@/pages/admin-view/adminItemsAddNew";
import AdminOrdersAll from "@/pages/admin-view/adminOrdersAll";
import AdminPanelView from "@/pages/admin-view/adminPanelView";
import NotFound from "@/pages/not-found/notFound";
import PanelView from "@/pages/panel-view/panelView";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

function AdminRoutes() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  console.log("adminroutes");
  console.log("isAuthenticated, user", isAuthenticated, user);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated && (user?.role === "user" || user?.role === "admin")) {
    console.log("went here");
    return (
      <Routes>
        {/* <Route path='/' element={<PanelView />} >
                  <Route path="dashboard" element={<PanelDashboard userRole={user?.role} />} />
              </Route> */}
        {/* Wrap routes inside AdminPanelView || Wrap once to avoid full refresh*/}
        <Route path="/" element={<AdminPanelView userRole={user?.role} />}>
          <Route index element={<AdminDashboard />} /> {/* ✅ Default route */}
          <Route path="dashboard" element={<AdminDashboard />} />
          {/* Nested routes for orders */}
          <Route path="orders">
            <Route index element={<AdminOrdersAll />} /> {/* Default orders route */}
            <Route path="all" element={<AdminOrdersAll />} />
          </Route>
          {/* Nested routes for items */}
          <Route path="items">
            <Route index element={<AdminItemsAddNew />} />
            <Route path="add-new" element={<AdminItemsAddNew />} />
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  } else if (isAuthenticated && user?.role === "frontend_user") {
    return <Navigate to="/user/dashboard" />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default AdminRoutes;
