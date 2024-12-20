import CheckAuth from '@/common/checkAuth';
import FrontEndUserContent from '@/components/frontend_user_view/frontendusercontent';
import FrontEndUserPage from '@/pages/frontend_user_view/frontendUserPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

function UserRoutes() {
    const { isAuthenticated, user } = useSelector(state => state.auth);
    console.log('userroutes')

    if (isAuthenticated && user?.role === 'frontend_user') {
        console.log('went here user')
        return (
            <Routes>
                <Route path='/' element={<FrontEndUserPage />}>
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