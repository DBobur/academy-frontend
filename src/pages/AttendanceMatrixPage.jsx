import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

const AttendanceMatrixPage = ({ groupId }) => {
    const [students, setStudents] = useState([]);
    const [dates, setDates] = useState([]);
    const [matrix, setMatrix] = useState({});

    useEffect(() => {
        fetchMatrix();
    }, []);

    const fetchMatrix = async () => {
        const res = await axios.get(`/attendance/matrix?groupId=${groupId}`);
        setStudents(res.data.students);
        setDates(res.data.dates);
        setMatrix(res.data.data);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>📅 Attendance Dashboard</h1>

            <table border="1" cellPadding="8">
                <thead>
                <tr>
                    <th>Student</th>
                    {dates.map(date => (
                        <th key={date}>{date}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.fullName || `ID: ${student.id}`}</td>
                        {dates.map(date => {
                            const status = matrix[student.id]?.[date];
                            const color =
                                status === "PRESENT" ? "lightgreen" :
                                    status === "ABSENT" ? "salmon" : "lightgray";
                            return (
                                <td key={date} style={{ backgroundColor: color, textAlign: "center" }}>
                                    {status ?? "-"}
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AttendanceMatrixPage;
