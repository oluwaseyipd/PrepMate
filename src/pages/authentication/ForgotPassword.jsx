import React from "react";
import { FaFacebook, FaGoogle, FaXTwitter, FaEnvelope  } from 'react-icons/fa6';
import logo from '../../assets/images/logo.png';
import fgpass from '../../assets/images/fgpass.png';
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <img
          src={fgpass}
          alt="Password Reset Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <img src={logo} alt="" className="w-30 md:w-60 mb-20" />
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">Forgot Password?</h1>
        <p className="text-gray-600 mb-6 text-left w-[420px]">
          Lost your password? Please enter your email address. You will receive a link to create a new password via email.
        </p>

        <form className="w-full max-w-sm">
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

          <button className="w-full bg-blue-600 text-white py-2 mb-10 rounded-lg hover:bg-blue-700 transition">
            Send Reset Link
          </button>
        </form>
        <Link to="/signin" className="text-blue-600">← Back to Login</Link>

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
                  <FaXTwitter className="text-blue-500 h-8 w-8" />
                  </button>
                  <button className="p-2 bg-blue-100 rounded-lg hover:bg-gray-200 cursor-pointer">
                  <FaFacebook className="text-blue-700 h-8 w-8" />
                  </button>
        </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
