import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Shart!

import axios from "../utils/axiosInstance";

const GroupListPage = () => {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate(); // ✅ Shart!

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await axios.get("/user-group");
            setGroups(res.data);
        } catch (error) {
            console.error("Failed to fetch groups:", error);
            alert("Failed to fetch groups.");
        }
    };

    const handleDelete = async (groupId) => {
        if (!window.confirm("Are you sure you want to delete this group?")) return;

        try {
            await axios.delete(`/user-group/${groupId}`);
            alert("Group deleted successfully!");
            fetchGroups();
        } catch (error) {
            console.error("Failed to delete group:", error);
            alert("Failed to delete group.");
        }
    };

    const handleDetails = (groupId) => {
        navigate(`/groups/${groupId}/details`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Manage Groups</h1>

            {groups.length === 0 ? (
                <p>No groups found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Group Name</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.id}</td>
                            <td>{group.groupName}</td>
                            <td>{group.createdDate ? group.createdDate.slice(0, 10) : "N/A"}</td>
                            <td>
                                <button onClick={() => handleDetails(group.id)}>Details</button>
                                <button onClick={() => handleDelete(group.id)} style={{ marginLeft: "10px" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default GroupListPage;
