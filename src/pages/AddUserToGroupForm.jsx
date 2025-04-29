import { useState } from "react";
import axios from "../utils/axiosInstance";

const AddUserToGroupForm = ({ groupId, onUserAdded }) => {
    const [userId, setUserId] = useState("");

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!userId) return alert("Please enter a user ID!");

        try {
            await axios.post(`/user-group/${groupId}/users/${userId}`);
            alert("User added successfully!");
            setUserId("");
            onUserAdded(); // 👈 Parentdagi student listni yangilash uchun
        } catch (error) {
            console.error("Failed to add user", error);
            alert("Failed to add user.");
        }
    };

    return (
        <form onSubmit={handleAddUser} style={{ marginTop: "20px" }}>
            <input
                type="number"
                placeholder="Enter User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
            />
            <button type="submit" style={{ marginLeft: "10px" }}>➕ Add User</button>
        </form>
    );
};

export default AddUserToGroupForm;
