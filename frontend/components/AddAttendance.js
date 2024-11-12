import React, { useState } from 'react';

const AddAttendance = () => {
  const [date, setDate] = useState('');
  const [selectedStudents, setSelectedStudents] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const attendanceData = {
      date,
      attendance: selectedStudents
    };

    await fetch('/api/attendance/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attendanceData)
    });
  };

  return (
    <div className="add-attendance">
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="students-list">
          {/* Student checkboxes */}
        </div>
        <button type="submit">Save Attendance</button>
      </form>
    </div>
  );
};
