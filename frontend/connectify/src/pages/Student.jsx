// // frontend/src/pages/Student.jsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Student() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <div>
//       <h1>Student Dashboard</h1>
//       <p>Welcome to the student dashboard</p>
//       <p>Click to chat: </p>
//       <button onClick={() => navigate('/chat')}>Chat</button>
//       <br />
//       <br />
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MessageCircle,
  BookOpen,
  Calendar,
  FileText,
  Award,
  Bell,
  User,
  LogOut,
  Book,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { getUserResumes } from '../services/api';

const Student = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [studentData, setStudentData] = useState({
    name: 'John Doe',
    course: 'Computer Science',
    semester: '4th Semester',
    profileImg: '/api/placeholder/150/150'
  });

  const [upcomingDeadlines, setUpcomingDeadlines] = useState([
    { id: 1, title: 'Database Assignment', course: 'Database Management', due: '2024-11-15', status: 'pending' },
    { id: 2, title: 'Algorithm Quiz', course: 'Data Structures', due: '2024-11-18', status: 'pending' },
    { id: 3, title: 'Project Presentation', course: 'Software Engineering', due: '2024-11-20', status: 'completed' }
  ]);

  const [courses, setCourses] = useState([
    { id: 1, name: 'Database Management', progress: 75, instructor: 'Dr. Smith' },
    { id: 2, name: 'Data Structures', progress: 60, instructor: 'Prof. Johnson' },
    { id: 3, name: 'Software Engineering', progress: 90, instructor: 'Dr. Williams' },
    { id: 4, name: 'Web Development', progress: 85, instructor: 'Prof. Davis' }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New assignment posted in Database Management', time: '2 hours ago', type: 'assignment' },
    { id: 2, message: 'Quiz reminder for Data Structures', time: '5 hours ago', type: 'quiz' },
    { id: 3, message: 'Grade posted for Software Engineering Project', time: '1 day ago', type: 'grade' }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    const fetchUserRqesumes = async () => {
      try {
        const response = await getUserResumes();
        if (!response.success) throw new Error('Failed to fetch user data');
        setResumes(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserRqesumes();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">EduLearn</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <MessageCircle className="h-6 w-6" onClick={() => navigate('/chat')} />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  src={studentData.profileImg}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700">{studentData.name}</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-blue-600 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome back, {studentData.name}!
              </h1>
              <p className="text-blue-100">
                {studentData.course} • {studentData.semester}
              </p>
            </div>
            {/* create a button to crate a resume */}
            <button
              onClick={() => navigate('/student/resume')}
              className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Create Resume
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Resume Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Resumes</h2>
            <div className="space-y-4">
              {resumes.map(resume => (
                <div key={resume._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Resume {resumes.indexOf(resume) + 1}</h3>
                    <p className="text-sm text-gray-500">{resume.updatedAt}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/student/resume/${resume._id}`)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Current Courses</h2>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-gray-800">{course.name}</h3>
                      <span className="text-sm text-gray-500">{course.instructor}</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            Progress
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-blue-600">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                        <div
                          style={{ width: `${course.progress}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
              <div className="space-y-4">
                {upcomingDeadlines.map(deadline => (
                  <div
                    key={deadline.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                      <p className="text-sm text-gray-500">{deadline.course}</p>
                      <p className="text-xs text-gray-400">Due: {deadline.due}</p>
                    </div>
                    {deadline.status === 'completed' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Notifications</h2>
              <div className="space-y-4">
                {notifications.map(notification => (
                  <div key={notification.id} className="flex items-start space-x-3">
                    {notification.type === 'assignment' && (
                      <FileText className="h-5 w-5 text-blue-500" />
                    )}
                    {notification.type === 'quiz' && (
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                    )}
                    {notification.type === 'grade' && (
                      <Award className="h-5 w-5 text-green-500" />
                    )}
                    <div>
                      <p className="text-sm text-gray-800">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <button
            onClick={() => navigate('/assignments')}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <FileText className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-gray-700">Assignments</span>
          </button>
          <button
            onClick={() => navigate('/grades')}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <TrendingUp className="h-6 w-6 text-green-500 mr-2" />
            <span className="text-gray-700">Grades</span>
          </button>
          <button
            onClick={() => navigate('/resources')}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Book className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-gray-700">Resources</span>
          </button>
          <button
            onClick={() => navigate('/calendar')}
            className="flex items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Calendar className="h-6 w-6 text-purple-500 mr-2" />
            <span className="text-gray-700">Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Student;