// frontend/src/pages/Proctor.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Proctor() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Proctor Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
