import { useContext } from "react";
import { AuthContext } from "../store/authContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    if (!user) return <div>Loading...</div>;

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>
            <h2>Welcome, {user.fullName || user.username}!</h2>
            <h3>Role: {user.role}</h3>

            {/* ADMIN */}
            {user.role === "SUPER" || user.role === "ADMIN" ? (
                <>
                    <h3>Admin Actions</h3>
                    <button onClick={() => navigate("/create-user")}>➕ Create User</button><br/><br/>
                    <button onClick={() => navigate("/users")}>👥 Manage Users</button><br/><br/>
                    <button onClick={() => navigate("/create-group")}>➕ Create Group</button><br/><br/>
                    <button onClick={() => navigate("/groups")}>🏫 Manage Groups</button><br/><br/>
                    <button onClick={() => navigate("/create-schedule")}>➕ Create Schedule</button><br/><br/>
                    <button onClick={() => navigate("/schedules")}>📅 Manage Schedules</button><br/><br/>

                    {/* Test Management (new) */}
                    <h3>Test Management</h3>
                    <button onClick={() => navigate("/admin/tests")}>🧪 Manage Tests</button><br/><br/>
                </>
            ) : null}


            {/* MANAGER */}
            {user.role === "MANAGER" ? (
                <>
                    <h3>Manager Actions</h3>
                    <button onClick={() => navigate("/create-schedule")}>➕ Create Schedule</button><br/><br/>
                    <button onClick={() => navigate("/groups")}>🏫 Manage Groups</button><br/><br/>
                    <button onClick={() => navigate("/schedules")}>📅 Manage Schedules</button><br/><br/>
                </>
            ) : null}

            {/* MENTOR */}
            {user.role === "MENTOR" ? (
                <>
                    <h3>Mentor Actions</h3>
                    <button onClick={() => navigate("/attendance-control")}>📚 Start Lesson (Attendance Control)</button><br/><br/>
                </>
            ) : null}

            {/* USER */}
            {user.role === "USER" ? (
                <>
                    <h3>User Actions</h3>
                    <button onClick={() => navigate("/profile")}>👤 View Profile</button><br/><br/>
                </>
            ) : null}

            <button onClick={handleLogout}>🚪 Logout</button>
        </div>
    );
};

export default DashboardPage;
