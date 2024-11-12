// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { registerUser } from '../../services/api'; // Adjust the import path as necessary

// export default function RegisterForm() {
//   const [formData, setFormData] = useState({ fullName: '', email: '', studentId: '', role: 'student', password: '', confirmPassword: '' });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await registerUser(formData);
//       navigate('/login');
//     } catch (error) {
//       console.error('Registration error:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
//       <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
//       <input type="text" name="studentId" value={formData.studentId} onChange={handleChange} placeholder="Student ID" required />
//       <select name="role" value={formData.role} onChange={handleChange} required>
//         <option value="student">Student</option>
//         <option value="professor">Professor</option>
//         <option value="proctor">Proctor</option>
//         <option value="clubLead">Club Lead</option>
//         <option value="admin">Admin</option>
//       </select>
//       <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
//       <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required />
//       <button type="submit">Register</button>
//     </form>
//   );
// }


// frontend/src/components/Auth/RegisterForm.jsx
import React, { useState } from 'react';
import { registerUser } from '../../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { Transition, Listbox } from '@headlessui/react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  IdentificationIcon,
  ChevronUpDownIcon,
  CheckIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const roles = [
  { id: 1, name: 'Student', value: 'student' },
  { id: 2, name: 'Professor', value: 'professor' },
  { id: 3, name: 'Proctor', value: 'proctor' },
  { id: 4, name: 'Club Lead', value: 'clubLead' },
  { id: 5, name: 'Admin', value: 'admin' },
];

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    studentId: '',
    role: roles[0],
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const dataToSend = {
        ...formData,
        role: formData.role.value
      };
      await registerUser(dataToSend);
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred during registration');
    }
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join our learning platform
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {error && (
              <Transition
                show={true}
                enter="transition ease-out duration-300"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
              >
                <div className="bg-red-50 p-4 rounded-md flex items-center">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              </Transition>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={handleChange}
                value={formData.email}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IdentificationIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="studentId"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Student ID"
                onChange={handleChange}
                value={formData.studentId}
              />
            </div>

            <Listbox
              value={formData.role}
              onChange={(role) => setFormData((prev) => ({ ...prev, role }))}
            >
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-3 pl-3 pr-10 text-left bg-white rounded-lg border border-gray-300 cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <span className="block truncate">{formData.role.name}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronUpDownIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={React.Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                    {roles.map((role) => (
                      <Listbox.Option
                        key={role.id}
                        className={({ active }) =>
                          `${
                            active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'
                          } cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        // frontend/src/components/Auth/RegisterForm.jsx (continued...)

                        value={role}
                      >
                        {({ selected }) => (
                          <>
                            <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                              {role.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockClosedIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full pl-10 px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={formData.confirmPassword}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              }`}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : null}
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
