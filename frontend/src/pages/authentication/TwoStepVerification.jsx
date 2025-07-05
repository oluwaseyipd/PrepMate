import React, { useState, useEffect, useRef } from 'react';
import logo from '../../assets/images/logo.png';
import twoFactor from '../../assets/images/2fa.png';
import { Link } from "react-router-dom";

const TwoStepVerification = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0);
  const inputRefs = useRef([]);

  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION = 300; // 5 minutes in seconds
  const RESEND_COOLDOWN = 60; // 1 minute in seconds

  // Initialize input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle cooldown timer
  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Handle lock timer
  useEffect(() => {
    let interval;
    if (lockTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockTimeRemaining(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockTimeRemaining]);

  // Validation functions
  const validateDigit = (value) => {
    // Only allow digits
    return /^\d?$/.test(value);
  };

  const validateCode = (codeArray) => {
    const errors = [];
    const codeString = codeArray.join('');

    if (codeString.length === 0) {
      errors.push('Verification code is required');
      return errors;
    }

    if (codeString.length < 6) {
      errors.push('Please enter all 6 digits');
      return errors;
    }

    // Check for invalid patterns
    if (/^(.)\1{5}$/.test(codeString)) {
      errors.push('Code cannot be all the same digit');
    }

    if (/^(012345|123456|654321|000000|111111|222222|333333|444444|555555|666666|777777|888888|999999)$/.test(codeString)) {
      errors.push('Please enter a valid verification code');
    }

    return errors;
  };

  const handleChange = (value, index) => {
    if (isLocked) return;

    // Validate input
    if (!validateDigit(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (value && index === 5 && newCode.every(digit => digit !== '')) {
      setTimeout(() => {
        handleSubmit(newCode);
      }, 100);
    }
  };

  const handleKeyDown = (e, index) => {
    if (isLocked) {
      e.preventDefault();
      return;
    }

    // Handle backspace
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newCode = [...code];
      
      if (newCode[index]) {
        // Clear current field
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        // Move to previous field and clear it
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs.current[index - 1]?.focus();
      }
    }
    
    // Handle arrow keys
    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    
    if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Handle paste
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handlePaste(e);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').replace(/\s/g, '').slice(0, 6);
    
    if (!/^\d{1,6}$/.test(pastedText)) {
      setErrors(['Please paste only numeric digits']);
      return;
    }

    const newCode = [...code];
    for (let i = 0; i < 6; i++) {
      newCode[i] = pastedText[i] || '';
    }
    setCode(newCode);

    // Focus the next empty field or the last field
    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (pastedText.length === 6) {
      setTimeout(() => {
        handleSubmit(newCode);
      }, 100);
    }
  };

  const handleSubmit = async (codeToValidate = code) => {
    if (isLocked) {
      setErrors([`Too many failed attempts. Please wait ${Math.floor(lockTimeRemaining / 60)}:${String(lockTimeRemaining % 60).padStart(2, '0')} before trying again.`]);
      return;
    }

    const validationErrors = validateCode(codeToValidate);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      // Focus first empty field
      const firstEmptyIndex = codeToValidate.findIndex(digit => digit === '');
      if (firstEmptyIndex !== -1) {
        inputRefs.current[firstEmptyIndex]?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      // Simulate API call
      console.log('Verification code:', codeToValidate.join(''));
      
      // Simulate different responses for testing
      const codeString = codeToValidate.join('');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate invalid code for demo (you can remove this)
      if (codeString === '123456') {
        throw new Error('INVALID_CODE');
      }
      
      // Success - redirect or show success message
      alert('Verification successful!');
      
    } catch (error) {
      console.error('Verification failed:', error);
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (error.message === 'INVALID_CODE') {
        if (newAttempts >= MAX_ATTEMPTS) {
          setIsLocked(true);
          setLockTimeRemaining(LOCK_DURATION);
          setErrors([`Too many failed attempts. Account locked for ${LOCK_DURATION / 60} minutes.`]);
        } else {
          setErrors([`Invalid verification code. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`]);
        }
      } else if (error.message === 'EXPIRED_CODE') {
        setErrors(['Verification code has expired. Please request a new code.']);
      } else {
        setErrors(['Verification failed. Please try again.']);
      }
      
      // Clear the code fields on error
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;

    setIsResending(true);
    setErrors([]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form state
      setCode(['', '', '', '', '', '']);
      setAttempts(0);
      setIsLocked(false);
      setLockTimeRemaining(0);
      setResendCooldown(RESEND_COOLDOWN);
      
      // Success message could be shown here
      alert('New verification code sent!');
      inputRefs.current[0]?.focus();
      
    } catch (error) {
      console.error('Resend failed:', error);
      setErrors(['Failed to resend code. Please try again.']);
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  const isCodeComplete = code.every(digit => digit !== '');
  const hasErrors = errors.length > 0;


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
        <p className="text-left md:w-[420px] text-gray-500 mb-1">
          We sent a verification code to your mobile. Enter the code from the mobile in the field below.
        </p>
        <p className='text-center md:w-[420px] font-semibold text-gray-500 mb-6'>*****234</p>
         {/* Lock Message */}
        {isLocked && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 max-w-md text-center">
            <p className="font-medium">Account Temporarily Locked</p>
            <p className="text-sm mt-1">
              Please wait {formatTime(lockTimeRemaining)} before trying again.
            </p>
          </div>
        )}

        {/* Error Messages */}
        {hasErrors && !isLocked && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 max-w-md">
            {errors.map((error, index) => (
              <p key={index} className="text-sm">{error}</p>
            ))}
          </div>
        )}

        <p className="text-black mb-4 font-semibold">
          Type your 6 digit security code
        </p>

        {/* Code Input Fields */}
        <div className="flex justify-center gap-2 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              disabled={isSubmitting || isLocked}
              className={`w-12 h-12 text-black text-center text-xl border rounded-lg focus:outline-none transition-colors ${
                hasErrors 
                  ? 'border-red-300 focus:border-red-500 bg-red-50' 
                  : isLocked
                  ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                  : digit 
                  ? 'border-blue-300 bg-blue-50' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              autoComplete="one-time-code"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={() => handleSubmit()}
          disabled={!isCodeComplete || isSubmitting || isLocked}
          className={`px-6 py-3 rounded-lg w-full max-w-sm font-medium transition-all duration-200 ${
            !isCodeComplete || isSubmitting || isLocked
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </div>
          ) : (
            'Verify Now'
          )}
        </button>

        {/* Resend Link */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Didn't get the code?{' '}
          {resendCooldown > 0 ? (
            <span className="text-gray-400">
              Resend in {resendCooldown}s
            </span>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending || isLocked}
              className={`font-medium ${
                isResending || isLocked
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-blue-600 hover:text-blue-500 cursor-pointer'
              }`}
            >
              {isResending ? 'Sending...' : 'Resend'}
            </button>
          )}
        </p>

        {/* Attempts Counter */}
        {attempts > 0 && !isLocked && (
          <p className="text-xs text-gray-400 mt-2">
            {attempts}/{MAX_ATTEMPTS} attempts used
          </p>
        )}
      </div>
    </div>
  );
};

export default TwoStepVerification;