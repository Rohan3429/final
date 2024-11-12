// frontend/src/pages/ClubLead.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClubLead() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Club Lead Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
