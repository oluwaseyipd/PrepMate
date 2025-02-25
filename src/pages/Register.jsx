import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import logo from '../assets/images/logo.png';

const Register = () => {
  const [role, setRole] = useState(null);

  const handleRoleSelection = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleGoBack = () => {
    setRole(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white rounded-3xl shadow-2xl flex max-w-6xl w-full h-[90vh]">
        {!role ? (
          // Role Selection Screen
          <div className="w-full flex flex-col items-center justify-center p-8">
            <h2 className="text-4xl font-bold text-blue-600 mb-8">How do you want to register?</h2>
            <div className="flex space-x-8">
              <div
                className="cursor-pointer w-40 h-40 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl flex flex-col items-center justify-center text-white hover:scale-105 transition"
                onClick={() => handleRoleSelection('student')}
              >
                <FaUserGraduate className="text-6xl mb-2" />
                <span className="text-lg font-semibold">Student</span>
              </div>
              <div
                className="cursor-pointer w-40 h-40 bg-gradient-to-r from-green-500 to-green-700 rounded-2xl flex flex-col items-center justify-center text-white hover:scale-105 transition"
                onClick={() => handleRoleSelection('teacher')}
              >
                <FaChalkboardTeacher className="text-6xl mb-2" />
                <span className="text-lg font-semibold">Teacher</span>
              </div>
            </div>
          </div>
        ) : (
          // Registration Form
          <div className="w-full md:flex">
            <div className="w-full md:w-1/2 bg-gradient-to-t from-blue-500 to-blue-700 text-white rounded-b-full md:rounded-b-none md:rounded-r-full p-8 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-4">{role === 'student' ? 'Join Us, Student!' : 'Welcome, Teacher!'}</h2>
                <p className="text-lg">
                  {role === 'student'
                    ? 'Start your learning journey today.'
                    : 'Help shape the future of learning.'}
                </p>
                <button
                  className="mt-6 px-6 py-3 cursor-pointer bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
                  onClick={handleGoBack}
                >
                  Go Back
                </button>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <img src={logo} alt="logo" className="w-40 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-center text-blue-600">Create an Account</h2>
              <form className="mt-8 space-y-4">
                <div>
                  <label className="block text-gray-700">Full Name</label>
                  <input type="text" placeholder="John Doe" required className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input type="email" placeholder="abc@xyz.com" required className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input type="text" placeholder="Username" className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                {role === 'student' && (
                <div>
                  <label className="block text-gray-700">Course/Department</label>
                  <select className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Course/Department</option>
                    <option>Computer Science</option>
                    <option>Business Administration</option>
                    <option>Engineering</option>
                  </select>
                </div>
                 )}
                {role === 'teacher' && (
                  <div>
                    <label className="block text-gray-700">Role (Admins/Coordinators only)</label>
                    <select className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Select Role</option>
                      <option>Admin</option>
                      <option>Coordinator</option>
                    </select>
                  </div>
                )}
                <div>
                  <label className="block text-gray-700">Password</label>
                  <input type="password" placeholder="********" required className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-gray-700">Confirm Password</label>
                  <input type="password" placeholder="********" required className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
             
                <div className="flex items-center">
                  <input type="checkbox" required className="mr-2 cursor-pointer" />
                  <p className="text-sm text-gray-600">
                    I agree to the 
                    <a href="https://www.notion.so/Page-Structure-1a3745bd8d8080a9aa1ffe341079664b?pvs=21" className="text-blue-600 hover:underline">Terms and Conditions</a> and 
                    <a href="https://www.notion.so/Page-Structure-1a3745bd8d8080a9aa1ffe341079664b?pvs=21" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                  </p>
                </div>
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition">
                  Create Account
                </button>
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <FaFacebook className="w-9 h-9 border border-blue-500 rounded-full p-1 text-blue-700 cursor-pointer" />
                  <FaGoogle className="w-8 h-8 border border-blue-500 rounded-full p-1 text-red-500 cursor-pointer" />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
