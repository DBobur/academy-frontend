import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const ScheduleListPage = () => {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await axios.get("/schedules"); // Jadval list API
            setSchedules(res.data);
        } catch (error) {
            console.error("Failed to fetch schedules:", error);
            alert("Failed to fetch schedules.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Manage Schedules</h1>

            {schedules.length === 0 ? (
                <p>No schedules found.</p>
            ) : (
                <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Group</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.id}</td>
                            <td>{schedule.title}</td>
                            <td>{schedule.groupName || "N/A"}</td>
                            <td>{schedule.startDate ? schedule.startDate.slice(0, 10) : "N/A"}</td>
                            <td>{schedule.endDate ? schedule.endDate.slice(0, 10) : "N/A"}</td>
                            <td>
                                <button>Edit</button>
                                <button style={{ marginLeft: "10px" }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ScheduleListPage;
