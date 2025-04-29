import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const GroupCreatePage = () => {
    const [groupName, setGroupName] = useState("");
    const [mentors, setMentors] = useState([]);
    const [selectedMentorId, setSelectedMentorId] = useState("");

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        try {
            const res = await axios.get("/user/mentors"); // ⚡ Mentorlani olish kerak
            setMentors(res.data);
        } catch (error) {
            console.error("Failed to fetch mentors:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!groupName || !selectedMentorId) {
            alert("Group name and Mentor are required!");
            return;
        }
        try {
            await axios.post("/user-group", {
                groupName: groupName,
                mentorId: selectedMentorId,
            });
            alert("Group created successfully!");
            setGroupName("");
            setSelectedMentorId("");
        } catch (error) {
            console.error(error);
            alert("Failed to create group.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Create Group</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                /><br/><br/>
                <select
                    value={selectedMentorId}
                    onChange={(e) => setSelectedMentorId(e.target.value)}
                >
                    <option value="" disabled>Select Mentor</option>
                    {mentors.map((mentor) => (
                        <option key={mentor.id} value={mentor.id}>
                            {mentor.fullName || mentor.username}
                        </option>
                    ))}
                </select><br/><br/>
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
};

export default GroupCreatePage;
