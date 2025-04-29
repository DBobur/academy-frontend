import axios from "../utils/axiosInstance";

const AttendanceService = {
    markAttendance: (studentId, date, status) =>
        axios.post("/attendance/mark", { studentId, date, status }),
};

export default AttendanceService;
