import LoadingScreen from '@/common/loadingScreen';
import PanelDashboard from '@/components/panel-view/dashboard';
import AdminDashboard from '@/pages/admin-view/adminDashboard';
import AdminPanelView from '@/pages/admin-view/adminPanelView';
import NotFound from '@/pages/not-found/notFound';
import PanelView from '@/pages/panel-view/panelView';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

function AdminRoutes() {
    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
    console.log('adminroutes')
    console.log('isAuthenticated, user',isAuthenticated, user)

    if(isLoading){
      return <LoadingScreen />
    }
    
    if(isAuthenticated && (user?.role === 'user' || user?.role === 'admin')){
        console.log("went here")
        return (
            <Routes>
                {/* <Route path='/' element={<PanelView />} >
                    <Route path="dashboard" element={<PanelDashboard userRole={user?.role} />} />
                </Route> */}
                <Route path='/dashboard' element={<AdminPanelView userRole={user?.role} />} >
                  <Route path='' element={<AdminDashboard />} />
                </Route>
                <Route path='/*' element={<NotFound />} />
            </Routes>
        );
      }else if(isAuthenticated && (user?.role === 'frontend_user')) {
        return (<Navigate to='/user/dashboard' />);
      }else {
        return (<Navigate to='/login' />);
      }
    
};

export default AdminRoutes;