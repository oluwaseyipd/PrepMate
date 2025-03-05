import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import register from '../../assets/images/register.png';
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <img
          src={register}
          alt="Study Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <img src={logo} alt="" className="w-30 md:w-60 mb-20" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
        <p className="text-gray-600 mb-6">Please sign up to your account and start the adventure</p>

        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <div className="flex items-center border border-gray-300 text-black rounded-lg px-3 py-2 mt-1">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                placeholder="Type your username"
                className="w-full ml-2 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border border-gray-300 text-black rounded-lg px-3 py-2 mt-1">
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                placeholder="Type your email address"
                className="w-full ml-2 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <div className="flex items-center border border-gray-300 text-black rounded-lg px-3 py-2 mt-1">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                placeholder="********"
                className="w-full ml-2 outline-none"
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">Must be at least 8 characters</p>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className='cursor-pointer'>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">Remember Me</label>
            </div>
            <a href="#" className="text-blue-600 hidden">Forgot Password?</a>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-black">
          Already have an account? <Link to="/signin" className="text-blue-600">Log In</Link>
        </p> 

        <div className="mt-4 flex items-center w-full max-w-sm">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex space-x-4 mt-4">
          <button className="p-2 bg-red-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                  <FaGoogle className="text-red-600 h-8 w-8" />
                  </button>
                  <button className="p-2 bg-blue-50 rounded-lg hover:bg-gray-200 cursor-pointer">
                  <FaTwitter className="text-blue-500 h-8 w-8" />
                  </button>
                  <button className="p-2 bg-blue-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                  <FaFacebook className="text-blue-700 h-8 w-8" />
                  </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
