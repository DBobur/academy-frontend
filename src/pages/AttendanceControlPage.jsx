import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AttendanceControlPage = () => {
    const [schedules, setSchedules] = useState([]);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchMySchedules();
    }, []);

    const fetchMySchedules = async () => {
        try {
            const res = await axios.get("/schedules/my");
            setSchedules(res.data);
        } catch (error) {
            console.error("Failed to fetch schedules:", error);
            alert("Failed to fetch schedules.");
        }
    };

    const handleScheduleChange = (e) => {
        const selectedId = e.target.value;
        const schedule = schedules.find(s => s.id === parseInt(selectedId));
        setSelectedSchedule(schedule);
    };

    const startLesson = async () => {
        if (!selectedSchedule) {
            alert("Please select a schedule!");
            return;
        }
        try {
            const res = await axios.post("/attendances", {
                scheduleId: selectedSchedule.id,
                groupId: selectedSchedule.groupId
            });
            alert("Lesson started! Attendance created.");
            setStudents(res.data?.attendanceDetails ?? []);
        } catch (error) {
            console.error(error);
            alert("Failed to start lesson.");
        }
    };

    const toggleIsPresent = async (detailId, currentIsPresent) => {
        try {
            const res = await axios.put(`/attendance-details/${detailId}`, {
                isPresent: !currentIsPresent
            });
            setStudents(prev =>
                prev.map(s =>
                    s.id === detailId ? { ...s, isPresent: res.data.isPresent } : s
                )
            );
        } catch (error) {
            console.error("Failed to update attendance", error);
            alert("Failed to update attendance.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Start Lesson (Attendance Control)</h1>

            <select
                value={selectedSchedule?.id || ""}
                onChange={handleScheduleChange}
            >
                <option value="" disabled>Select a schedule</option>
                {schedules.map(schedule => (
                    <option key={schedule.id} value={schedule.id}>
                        {schedule.title} ({schedule.startDate})
                    </option>
                ))}
            </select><br/><br/>

            <button onClick={startLesson}>Start Lesson</button>

            {students.length > 0 && (
                <>
                    <hr />
                    <h3>🧑‍🎓 Students in this Attendance</h3>

                    <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
                        <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {students.map(s => (
                            <tr key={s.id}>
                                <td style={{ textAlign: "center" }}>{s.studentId}</td>
                                <td style={{ textAlign: "center" }}>
                                    {s.isPresent ? "🟩 Present" : "🟥 Absent"}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <button onClick={() => toggleIsPresent(s.id, s.isPresent)}>
                                        {s.isPresent ? "❌ Mark Absent" : "✅ Mark Present"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default AttendanceControlPage;
