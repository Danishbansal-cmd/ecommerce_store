import PanelDashboard from '@/components/panel-view/dashboard';
import PanelView from '@/pages/panel-view/panelView';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

function AdminRoutes() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    console.log('adminroutes')
    
    if(isAuthenticated && (user?.role === 'user' || user?.role === 'admin')){
        console.log("went here")
        return (
            <Routes>
                <Route path='/' element={<PanelView />} >
                    <Route path="dashboard" element={<PanelDashboard userRole={user?.role} />} />
                </Route>
            </Routes>
        );
      }else if(isAuthenticated && (user?.role === 'frontend_user')) {
        return (<Navigate to='/user/dashboard' />);
      }else {
        return (<Navigate to='/login' />);
      }
    
};

export default AdminRoutes;