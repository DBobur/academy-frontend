import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import AttendanceService from "../services/AttendanceService";

const AttendancePage = () => {
    const [students, setStudents] = useState([]);

    const fetchStudents = async () => {
        try {
            const res = await axios.get("/students"); // ⚡ students ro'yxatini olish
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch students:", error);
            alert("Failed to fetch students.");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleMarkAttendance = async (studentId, status) => {
        try {
            const date = new Date().toISOString().slice(0, 10); // Bugungi sana: YYYY-MM-DD
            await AttendanceService.markAttendance(studentId, date, status);
            alert(`${status} marked for student ${studentId}`);
        } catch (error) {
            console.error("Failed to mark attendance:", error);
            alert("Failed to mark attendance.");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Attendance Page</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        {student.fullName || student.username}
                        <button onClick={() => handleMarkAttendance(student.id, "PRESENT")} style={{ marginLeft: "10px" }}>
                            Present
                        </button>
                        <button onClick={() => handleMarkAttendance(student.id, "ABSENT")} style={{ marginLeft: "10px" }}>
                            Absent
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AttendancePage;
