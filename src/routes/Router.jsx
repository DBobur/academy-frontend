import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/LoginPage.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";
import GroupPage from "../pages/GroupPage.jsx";
import AttendancePage from "../pages/AttendancePage.jsx";
import AttendanceControlPage from "../pages/AttendanceControlPage.jsx";
import UserListPage from "../pages/UserListPage.jsx";
import UserCreatePage from "../pages/UserCreatePage.jsx";
import GroupListPage from "../pages/GroupListPage.jsx";
import GroupCreatePage from "../pages/GroupCreatePage.jsx";
import ScheduleCreatePage from "../pages/CreateScheduleForm.jsx"; // <-- To'g'ri sahifa
import ScheduleListPage from "../pages/ScheduleListPage.jsx";
import GroupDetailsPage from "../pages/GroupDetailsPage.jsx";
import AdminTestManagementPage from "../pages/AdminTestManagement.jsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/group" element={<GroupPage />} />
                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/attendance-control" element={<AttendanceControlPage />} />
                <Route path="/users" element={<UserListPage />} />
                <Route path="/create-user" element={<UserCreatePage />} />
                <Route path="/groups" element={<GroupListPage />} />
                <Route path="/create-group" element={<GroupCreatePage />} />
                <Route path="/create-schedule" element={<ScheduleCreatePage />} />
                <Route path="/schedules" element={<ScheduleListPage />} />
                <Route path="/groups/:id/details" element={<GroupDetailsPage />} />
                <Route path="/admin/tests" element={<AdminTestManagementPage />} /> {/* 🧪 Manage Tests */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
