import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const UserListPage = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/user"); // ⚡ Eslatma: Senda user list API kerak bo'ladi
            setUsers(res.data);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch users.");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.fullName || user.username} ({user.email}) - Role: {user.role}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserListPage;
