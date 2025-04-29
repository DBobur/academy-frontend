import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const CreateScheduleForm = ({ groupId, onScheduleCreated }) => {
    const [mentors, setMentors] = useState([]);
    const [title, setTitle] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchMentors();
    }, []);

    const fetchMentors = async () => {
        try {
            const res = await axios.get("/user/mentors");
            setMentors(res.data);
        } catch (error) {
            console.error("Failed to load mentors", error);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title || !teacherId || !startDate || !endDate) {
            return alert("Please fill all fields!");
        }
        try {
            await axios.post("/schedules", {
                title,
                groupId,
                teacherId,
                startDate,
                endDate
            });
            alert("Schedule created successfully!");
            setTitle("");
            setTeacherId("");
            setStartDate("");
            setEndDate("");
            onScheduleCreated(); // 👈 Parentdagi schedules listni yangilash uchun
        } catch (error) {
            console.error("Failed to create schedule", error);
            alert("Failed to create schedule.");
        }
    };

    return (
        <form onSubmit={handleCreate} style={{ marginTop: "20px" }}>
            <input
                type="text"
                placeholder="Schedule Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            /><br /><br />

            <select value={teacherId} onChange={(e) => setTeacherId(e.target.value)} required>
                <option value="">Select Mentor (Teacher)</option>
                {mentors.map((mentor) => (
                    <option key={mentor.id} value={mentor.id}>
                        {mentor.fullName || mentor.username}
                    </option>
                ))}
            </select><br /><br />

            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
            /><br /><br />

            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
            /><br /><br />

            <button type="submit">➕ Create Schedule</button>
        </form>
    );
};

export default CreateScheduleForm;
