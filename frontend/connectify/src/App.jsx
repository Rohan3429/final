import React,{useState} from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import RegisterForm from './components/Auth/RegisterForm';
import LoginForm from './components/Auth/LoginForm';
// import PrivateRoute from './components/Auth/PrivateRoute';
import Student from './pages/Student';
import Professor from './pages/Professor';
import Proctor from './pages/Proctor';
import Home from './pages/Home';
import Chat from './pages/Chat';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeViewer from './pages/ResumeViewer';

function App() {
  const [user, setUser] = useState(
    localStorage.getItem('UserId') || null
  );

  const handleLogout = () => {
    localStorage.removeItem('UserId');
    localStorage.removeItem('token');
    setUser(null);
  }

  // React.useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     fetch('http://localhost:5000/api/auth/me', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => setUser(data.user))
  //       .catch((error) => console.error('Error fetching user:', error));
  //   }
  // }
  // , []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/student" element={<Student />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/proctor" element={<Proctor />} />
        <Route path="/student/resume" element={<ResumeBuilder />} />
        <Route path="/student/resume/:id" element={<ResumeViewer />} />
        {/* <Route path="/chat" element={<Chat />} />  */}
        {console.log("user: ",user)}
        <Route 
          path="/chat" 
          element={
            user ? (
              <Chat user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        {/* <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} /> */}
        
        {/* <Route path="/student" element={<PrivateRoute><Student /></PrivateRoute>} />
        <Route path="/professor" element={<PrivateRoute><Professor /></PrivateRoute>} />
        <Route path="/proctor" element={<PrivateRoute><Proctor /></PrivateRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App; // Ensure App is exported as default