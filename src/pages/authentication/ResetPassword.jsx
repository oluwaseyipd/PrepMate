import React from 'react';
import { FaLock } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logo from '../../assets/images/logo.png';
import fgpass from '../../assets/images/fgpass.png';
import { Link } from "react-router-dom";

const ResetPassword = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  
    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
    return (
      <div className="flex h-screen">
        {/* Left Side with Image */}
        <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
          <img
            src={fgpass}
            alt="Reset Password Illustration"
            className="w-3/4"
          />
        </div>
  
        {/* Right Side - Reset Password Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <img src={logo} alt="" className='w-30 md:w-60 mb-20' />
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-gray-600 mb-6">For <span className='font-semibold'>exampleinfo@mail.com</span></p>
          </div>
  
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-gray-700">New Password</label>
              <div className="flex items-center border border-gray-300 text-black rounded-lg px-3 py-2 mt-1">
                <FaLock className="text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full ml-2 outline-none"
                />
                <span onClick={togglePassword} className="cursor-pointer">
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
  
            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <div className="flex items-center border border-gray-300 text-black rounded-lg px-3 py-2 mt-1">
                <FaLock className="text-gray-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full ml-2 outline-none"
                />
                <span onClick={toggleConfirmPassword} className="cursor-pointer">
                  {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
            </div>
  
            <button className="w-full bg-blue-600 text-white py-2 cursor-pointer rounded-lg hover:bg-blue-700 transition">
              Set New Password
            </button>
          </form>
  
          <p className="mt-4 text-blue-600 cursor-pointer">
            <Link to="/signin">← Back To Login</Link>
          </p>
        </div>
      </div>
    );
  };
  

export default ResetPassword