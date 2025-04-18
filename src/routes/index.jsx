import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import Dashboard from '../pages/Dashboard'
import ProfilePage from '../pages/ProfilePage'
import UserListPage from '../pages/UserListPage' // 👈 import qilishni unutmang
import MainLayout from '../layouts/MainLayout'
import ContractListPage from "../pages/ContractListPage.jsx";

const AppRoutes = () => {
  return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
            <Route path="contracts" element={<ContractListPage />} />

            {/* Protected routes with layout */}
          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UserListPage />} /> {/* ✅ Buni unutma */}
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default AppRoutes
