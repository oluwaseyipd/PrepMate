import React from 'react'
import logo from '../../assets/images/logo.png';
import verifymail from '../../assets/images/verifymail.png';
import { Link } from "react-router-dom";

const VerifyEmail = () => {
    return (
        <div className="flex h-screen">
          <div className="hidden lg:flex items-center justify-center w-1/2 bg-blue-50">
            <img
              src={verifymail}
              alt="Verify Email Illustration"
              className="max-w-md"
            />
          </div>
          <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8">
            <img src={logo} alt="Edmate Logo" className="w-30 md:w-60 mb-6" />
            <h2 className="text-2xl font-bold text-black text-center mb-4">Verify your mail</h2>
            <p className="text-center text-gray-600 mb-6">
              Account activation link sent to your email address:
              <br />
              <span className="font-semibold">exampleinfo@mail.com</span>. Please follow the
              link inside to continue.
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full cursor-pointer max-w-sm hover:bg-blue-700 transition">
              Skip For Now
            </button>
            <p className="text-center text-md text-gray-500 mt-4">
              Didn't get the mail? <Link to="/verify-email" className="text-blue-600">Resend</Link>
            </p>
          </div>
        </div>
      );
    };

export default VerifyEmail