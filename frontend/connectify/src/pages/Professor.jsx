// frontend/src/pages/Professor.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Professor() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Professor Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
