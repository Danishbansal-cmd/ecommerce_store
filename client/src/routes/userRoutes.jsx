import CheckAuth from '@/common/checkAuth';
import LoadingScreen from '@/common/loadingScreen';
import FrontEndUserContent from '@/components/frontend-user-view/frontendusercontent';
import Home from '@/pages/frontend-user-view/home';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

function UserRoutes() {
    const { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
    console.log('userroutes')

    if(isLoading){
        return <LoadingScreen />
      }

    if (isAuthenticated && user?.role === 'frontend_user') {
        console.log('went here user')
        return (
            <Routes>
                <Route path='/' element={<Home />}>
                    <Route path="dashboard" element={<FrontEndUserContent />} />
                </Route>
            </Routes>
        );
    } else if (isAuthenticated && (user?.role === 'user' || user?.role === 'admin')) {
        return (<Navigate to='/panel/dashboard' />);
    } else {
        return (<Navigate to='/login' />);
    }

};

export default UserRoutes;