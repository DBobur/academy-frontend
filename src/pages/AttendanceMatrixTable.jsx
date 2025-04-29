import React from "react";

const AttendanceMatrixTable = ({ students, dates, matrix }) => {
    return (
        <div style={{ marginTop: "40px" }}>
            <h3>📅 Attendance Matrix</h3>
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
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
                                status === "PRESENT" ? "#c6f6d5" :
                                    status === "ABSENT" ? "#feb2b2" : "#e2e8f0";
                            return (
                                <td
                                    key={date}
                                    style={{
                                        backgroundColor: color,
                                        textAlign: "center",
                                        minWidth: "70px"
                                    }}
                                >
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

export default AttendanceMatrixTable;
