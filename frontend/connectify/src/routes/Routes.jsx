// frontend/src/routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import LoginForm from '../components/Auth/LoginForm';
import Student from '../pages/Student';
import Professor from '../pages/Professor';
import Proctor from '../pages/Proctor';
import ClubLead from '../pages/ClubLead';
import Admin from '../pages/Admin';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
        <Route path="/professor" element={<PrivateRoute><Professor /></PrivateRoute>} />
        <Route path="/proctor" element={<PrivateRoute><Proctor /></PrivateRoute>} />
        <Route path="/clublead" element={<PrivateRoute><ClubLead /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
