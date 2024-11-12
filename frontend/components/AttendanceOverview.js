import React, { useState, useEffect } from 'react';

const AttendanceOverview = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    const response = await fetch('/api/attendance/overview');
    const data = await response.json();
    setStudents(data);
  };

  return (
    <div className="attendance-overview">
      <h2>Attendance Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Days Present</th>
            <th>Total Days</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.daysPresent}</td>
              <td>{student.totalDays}</td>
              <td>{student.attendancePercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
