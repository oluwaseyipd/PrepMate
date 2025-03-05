import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
import logo from '../../assets/images/logo.png';
import twoFactor from '../../assets/images/2fa.png';
import { Link } from "react-router-dom";

const TwoStepVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (value, index) => {
    let newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = () => {
    alert(`Entered Code: ${code.join('')}`);
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-blue-50">
        <img
          src={twoFactor}
          alt="Two-Step Verification Illustration"
          className="max-w-md"
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-8">
      <img src={logo} alt="Logo" className="w-30 md:w-60 mb-6" />
        <h2 className="text-3xl md:text-4xl text-black font-semibold mb-4">Two-Step Verification</h2>
        <p className="text-left w-[420px] text-gray-500 mb-1">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <p className='text-left w-[420px] font-semibold text-gray-500 mb-6'>*****234</p>
        <p className='text-black mb-1 font-semibold text-left'>Type your 6 digit security code.</p>
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-black text-center text-xl border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full cursor-pointer max-w-sm hover:bg-blue-700 transition" onClick={handleSubmit}>
          Verify Now
        </button>
        <p className="text-left text-sm text-gray-500 mt-4">
          Didn't get the mail? <Link to="/two-step-verification" className="text-blue-600 cursor-pointer">Resend</Link>
        </p>
      </div>
    </div>
  );
};

export default TwoStepVerification;