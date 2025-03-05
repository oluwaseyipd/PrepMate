import React from 'react';
import { FaFacebook, FaGoogle, FaTwitter, FaUser, FaLock } from 'react-icons/fa';
import logo from '../../assets/images/logo.png';
import signin from '../../assets/images/signin.png';
import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <img
          src={signin}
          alt="Study Illustration"
          className="w-3/4"
        />
      </div>
      
      {/* Right Side - Sign In Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
      <img
          src={logo}
          alt="Study Illustration"
          className="w-30 md:w-60 mb-20"
        />
        <h1 className="text-3xl text-left font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
        <p className="text-gray-600 mb-6">Please sign in to your account and start the adventure</p>

        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-gray-700">Email or Username</label>
            <div className="flex items-center rounded-lg px-3 py-2 mt-1  border border-gray-300">
              <FaUser className="text-gray-500" />
              <input
                type="text"
                placeholder="Type your username"
                className="w-full ml-2 outline-none text-black"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Current Password</label>
            <div className="flex items-center rounded-lg px-3 py-2 mt-1  border border-gray-300">
              <FaLock className="text-gray-500" />
              <input
                type="password"
                placeholder="Type your Password"
                className="w-full ml-2 outline-none text-black"
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className='cursor-pointer'>
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-gray-700">Remember Me</label>
            </div>
            <Link to="/forgot-password" className="text-blue-600">Forgot Password?</Link>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-4xl hover:bg-blue-700 transition cursor-pointer ">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-black">
          New on our platform? <Link to="/register" className="text-blue-600">Create an account</Link>
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

export default Signin;
