import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axiosInstance";

import AttendanceMatrixTable from "./AttendanceMatrixTable";
import CreateScheduleForm from "./CreateScheduleForm";
import AddUserToGroupForm from "./AddUserToGroupForm";

const GroupDetailsPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState({});
    const [students, setStudents] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [matrixStudents, setMatrixStudents] = useState([]);
    const [matrixDates, setMatrixDates] = useState([]);
    const [matrixData, setMatrixData] = useState({});

    useEffect(() => {
        fetchAll();
    }, []);

    const fetchAll = async () => {
        await fetchGroupDetails();
        await fetchGroupStudents();
        await fetchAttendanceMatrix();
    };

    const fetchGroupDetails = async () => {
        try {
            const groupRes = await axios.get(`/user-group/${id}`);
            const schedulesRes = await axios.get(`/schedules?groupId=${id}`);
            setGroup(groupRes.data);
            setSchedules(schedulesRes.data);
        } catch (error) {
            console.error("Failed to fetch group or schedules", error);
        }
    };

    const fetchGroupStudents = async () => {
        try {
            const res = await axios.get(`/user-group/${id}/users`);
            setStudents(res.data);
        } catch (error) {
            console.error("Failed to fetch students", error);
        }
    };

    const fetchAttendanceMatrix = async () => {
        try {
            const res = await axios.get(`/attendance/matrix?groupId=${id}`);
            setMatrixStudents(res.data.students);
            setMatrixDates(res.data.dates);
            setMatrixData(res.data.data);
        } catch (error) {
            console.error("Failed to fetch attendance matrix", error);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Group Details: {group.groupName}</h1>
            <p><strong>Group ID:</strong> {group.id}</p>

            <section style={{ marginTop: "30px" }}>
                <h2>👥 Students</h2>
                <ul>
                    {students.length > 0 ? (
                        students.map((user) => (
                            <li key={user.id}>
                                {user.fullName || user.username} (ID: {user.id})
                            </li>
                        ))
                    ) : (
                        <p>No students in this group yet.</p>
                    )}
                </ul>
                <AddUserToGroupForm groupId={id} onUserAdded={fetchGroupStudents} />
            </section>

            <hr />

            <section style={{ marginTop: "30px" }}>
                <h2>📅 Schedules</h2>
                <ul>
                    {schedules.length > 0 ? (
                        schedules.map((s) => (
                            <li key={s.id}>
                                {s.title} ({s.startDate} → {s.endDate})
                            </li>
                        ))
                    ) : (
                        <p>No schedules created yet.</p>
                    )}
                </ul>
                <CreateScheduleForm groupId={id} onScheduleCreated={fetchGroupDetails} />
            </section>

            <hr />

            <section style={{ marginTop: "30px" }}>
                <h2>📊 Attendance Matrix</h2>
                <AttendanceMatrixTable
                    students={matrixStudents}
                    dates={matrixDates}
                    matrix={matrixData}
                />
            </section>
        </div>
    );
};

export default GroupDetailsPage;
