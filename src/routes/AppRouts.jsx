import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/auth/LoginPage'
import MainLayout from '../layouts/MainLayout'
import PrivateRoute from './PrivateRout.jsx'
import ProfilePage from "../pages/profile/ProfilePage.jsx";
import UserListPage from "../pages/users/UserListPage.jsx";
import ViewUserPage from "../pages/users/ViewUserPage.jsx";
import DashboardPage from "../pages/dashboard/DasboardPage.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={
                <PrivateRoute>
                    <MainLayout />
                </PrivateRoute>
            }>
                <Route path="/home" element={<HomePage />} />
                <Route path="/" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/users/:id/view" element={<ViewUserPage />} />

            </Route>
        </Routes>
    )
}

export default AppRoutes
