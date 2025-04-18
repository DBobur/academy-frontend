import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import Dashboard from '../pages/Dashboard'
import MainLayout from '../layouts/MainLayout'
import ProfilePage from '../pages/ProfilePage'
import UserListPage from '../pages/UserListPage'
import ContractListPage from "../pages/ContractListPage.jsx";
import ContractFormPage from "../pages/ContractListPage.jsx"; // 👈 YANGI QO‘SHILDI

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="users" element={<UserListPage />} /> {/* 👈 YANGI QO‘SHILDI */}
          <Route path="contracts/create" element={<ContractFormPage />} />
          <Route path="contracts/edit/:id" element={<ContractFormPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
