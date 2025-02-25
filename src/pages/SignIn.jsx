import React from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import logo from '../assets/images/logo.png';
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white shadow-2xl flex flex-col md:flex-row max-w-6xl w-full min-h-[80vh]">
          {/* Left Section - Login Form */}
        
          <div className="w-full md:w-1/2 bg-gradient-to-t from-blue-500 to-blue-700 text-white rounded-b-full md:rounded-b-none md:rounded-r-full p-8 flex items-center justify-center">
          <div className="text-center max-w-md py-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>
{/* Right Section - Info */}
      
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <img src={logo} alt="logo" className="w-60 mx-auto mb-2" />
          <h2 className="text-3xl font-bold text-center text-blue-600">Log in / Sign Up</h2>
          <form className="mt-8 space-y-4">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="abc@xyz.com"
                className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 text-black border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center text-sm text-gray-600">
                <input type="checkbox" className="mr-2 cursor-pointer" /> Remember me
              </label>
              <a href="#" className="text-sm text-blue-600 hover:underline cursor-pointer">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
            >
              Log in
            </button>
            <div className="flex items-center justify-center space-x-4 mt-4">
              <FaFacebook className="w-9 h-9 border border-blue-500 rounded-full p-1 text-blue-700 cursor-pointer" />
              <FaGoogle className="w-8 h-8 border border-blue-500 rounded-full p-1 text-red-500 cursor-pointer" />
            </div>
            <p className="text-center text-gray-600 mt-4">
              Don’t have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
