import React, { useState, useEffect } from 'react';
import logo from '../../assets/images/logo.png';
import verifymail from '../../assets/images/verifymail.png';
import { Link, useNavigate, useLocation } from "react-router-dom";

const VerifyEmail = () => {

  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, verified, expired
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const MAX_RESEND_ATTEMPTS = 5;
  const RESEND_COOLDOWN = 60; // 1 minute in seconds
  const MAX_DAILY_RESENDS = 10;

  // Get email domain for email client detection
  const getEmailDomain = (email) => {
    return email.split('@')[1]?.toLowerCase() || '';
  };

  // Get email client URL based on domain
  const getEmailClientUrl = (email) => {
    const domain = getEmailDomain(email);
    const emailClients = {
      'gmail.com': 'https://mail.google.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'yahoo.co.uk': 'https://mail.yahoo.com',
      'hotmail.com': 'https://outlook.live.com',
      'outlook.com': 'https://outlook.live.com',
      'live.com': 'https://outlook.live.com',
      'msn.com': 'https://outlook.live.com',
      'icloud.com': 'https://www.icloud.com/mail',
      'me.com': 'https://www.icloud.com/mail',
      'mac.com': 'https://www.icloud.com/mail',
      'aol.com': 'https://mail.aol.com',
    };
    
    return emailClients[domain] || null;
  };

  // Handle opening email client
  const handleOpenEmail = () => {
    const emailClientUrl = getEmailClientUrl(email);
    
    if (emailClientUrl) {
      window.open(emailClientUrl, '_blank');
    } else {
      // For other email providers, try to open default mail client
      window.location.href = `mailto:`;
    }
  };

  // Get email provider name for display
  const getEmailProviderName = (email) => {
    const domain = getEmailDomain(email);
    const providers = {
      'gmail.com': 'Gmail',
      'yahoo.com': 'Yahoo Mail',
      'yahoo.co.uk': 'Yahoo Mail',
      'hotmail.com': 'Outlook',
      'outlook.com': 'Outlook',
      'live.com': 'Outlook',
      'msn.com': 'Outlook',
      'icloud.com': 'iCloud Mail',
      'me.com': 'iCloud Mail',
      'mac.com': 'iCloud Mail',
      'aol.com': 'AOL Mail',
    };
    
    return providers[domain] || 'your email';
  };

  // Get email from navigation state or localStorage
  useEffect(() => {
    const emailFromState = location.state?.email;
    const emailFromStorage = localStorage.getItem('pendingVerificationEmail');
    const storedEmail = emailFromState || emailFromStorage || 'exampleinfo@mail.com';
    
    setEmail(storedEmail);
    setIsEmailValid(validateEmail(storedEmail));
    
    // Check if there's a verification token in URL
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    if (token) {
      handleTokenVerification(token);
    }
    
    // Check stored resend data
    checkResendLimits();
  }, [location]);

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

  // Email validation
  const validateEmail = (emailToValidate) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailToValidate);
  };

  // Check resend limits from localStorage
  const checkResendLimits = () => {
    const today = new Date().toDateString();
    const storedData = localStorage.getItem('emailVerificationData');
    
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.date === today) {
        setResendCount(data.count || 0);
        const timeSinceLastResend = Math.floor((Date.now() - (data.lastResend || 0)) / 1000);
        if (timeSinceLastResend < RESEND_COOLDOWN) {
          setResendCooldown(RESEND_COOLDOWN - timeSinceLastResend);
        }
      } else {
        // Reset for new day
        localStorage.removeItem('emailVerificationData');
        setResendCount(0);
      }
    }
  };

  // Update resend data in localStorage
  const updateResendData = () => {
    const today = new Date().toDateString();
    const data = {
      date: today,
      count: resendCount + 1,
      lastResend: Date.now()
    };
    localStorage.setItem('emailVerificationData', JSON.stringify(data));
  };

  // Handle token verification from URL
  const handleTokenVerification = async (token) => {
    try {
      // Simulate API call to verify token
      console.log('Verifying token:', token);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate token validation
      if (token === 'expired') {
        setVerificationStatus('expired');
        setErrors(['Verification link has expired. Please request a new one.']);
      } else if (token === 'invalid') {
        setErrors(['Invalid verification link. Please request a new one.']);
      } else {
        setVerificationStatus('verified');
        setSuccessMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      setErrors(['Failed to verify email. Please try again.']);
    }
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setIsEmailValid(validateEmail(newEmail));
    
    // Clear errors when user types
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  // Handle resend email
  const handleResend = async () => {
    // Validation checks
    if (resendCooldown > 0) {
      setErrors([`Please wait ${resendCooldown} seconds before requesting another email.`]);
      return;
    }

    if (resendCount >= MAX_DAILY_RESENDS) {
      setErrors(['Daily resend limit reached. Please try again tomorrow.']);
      return;
    }

    if (!isEmailValid) {
      setErrors(['Please enter a valid email address.']);
      return;
    }

    setIsResending(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      // Simulate API call
      console.log('Resending verification email to:', email);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different responses
      const random = Math.random();
      if (random < 0.1) { // 10% chance of failure
        throw new Error('NETWORK_ERROR');
      }
      
      // Success
      setSuccessMessage('Verification email sent successfully! Please check your inbox.');
      setResendCount(prev => prev + 1);
      setResendCooldown(RESEND_COOLDOWN);
      updateResendData();
      
      // Store email for future reference
      localStorage.setItem('pendingVerificationEmail', email);
      
    } catch (error) {
      console.error('Resend failed:', error);
      
      if (error.message === 'EMAIL_ALREADY_VERIFIED') {
        setSuccessMessage('This email is already verified!');
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 2000);
      } else if (error.message === 'EMAIL_NOT_FOUND') {
        setErrors(['Email address not found. Please check and try again.']);
      } else if (error.message === 'RATE_LIMITED') {
        setErrors(['Too many requests. Please wait before trying again.']);
        setResendCooldown(RESEND_COOLDOWN * 2);
      } else {
        setErrors(['Failed to send verification email. Please try again.']);
      }
    } finally {
      setIsResending(false);
    }
  };

  // Handle manual email verification check
  const handleCheckVerification = async () => {
    try {
      console.log('Checking verification status for:', email);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate checking if email is now verified
      const isVerified = Math.random() > 0.7; // 30% chance it's verified
      
      if (isVerified) {
        setVerificationStatus('verified');
        setSuccessMessage('Email verified successfully! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 2000);
      } else {
        setErrors(['Email not yet verified. Please check your inbox and click the verification link.']);
      }
    } catch (error) {
      console.error('Verification check failed:', error);
      setErrors(['Failed to check verification status. Please try again.']);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const canResend = resendCooldown === 0 && resendCount < MAX_DAILY_RESENDS && !isResending;

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
        <img src={logo} alt="Logo" className="w-30 md:w-60 mb-6" />
        
        {/* Verification Status Messages */}
        {verificationStatus === 'verified' && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6 max-w-md text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">Email Verified!</span>
            </div>
            <p className="text-sm">Your email has been successfully verified.</p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-black text-center mb-4">
          {verificationStatus === 'verified' ? 'Email Verified' : 'Verify your email'}
        </h2>

        {verificationStatus !== 'verified' && (
          <>
            {/* Success Message */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md mb-4 max-w-md text-center">
                <p className="text-sm">{successMessage}</p>
              </div>
            )}

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mb-4 max-w-md">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm">{error}</p>
                ))}
              </div>
            )}

            <div className="text-center text-gray-600 mb-6 max-w-md">
              <p className="mb-2">
                A verification link has been sent to:
              </p>
              
              {/* Email Display/Input */}
              {showEmailInput ? (
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`w-full px-3 py-2 border rounded-md text-center font-semibold ${
                      isEmailValid 
                        ? 'border-green-300 bg-green-50 text-green-700' 
                        : 'border-red-300 bg-red-50 text-red-700'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter your email address"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => setShowEmailInput(false)}
                      className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isEmailValid) {
                          setShowEmailInput(false);
                          localStorage.setItem('pendingVerificationEmail', email);
                        }
                      }}
                      disabled={!isEmailValid}
                      className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mb-4">
                  <span className="font-semibold text-blue-600">{email}</span>
                  <button
                    onClick={() => setShowEmailInput(true)}
                    className="ml-2 text-sm text-gray-500 hover:text-gray-700 underline"
                  >
                    Change
                  </button>
                </div>
              )}
              
              <p className="mb-4">Please click the verification link in your email to continue.</p>
              <p className="text-sm text-gray-500">
                <strong>Email verification is required</strong> to access your account and ensure security.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-sm space-y-3">
              {/* Open Email Button */}
              <button
                onClick={handleOpenEmail}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Open {getEmailProviderName(email)}
              </button>

              {/* Check Verification Button */}
              <button
                onClick={handleCheckVerification}
                className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                I've Verified My Email
              </button>
            </div>

            {/* Resend Section */}
            <div className="text-center text-md text-gray-500 mt-6">
              <p>
                Didn't get the email?{' '}
                {canResend ? (
                  <button
                    onClick={handleResend}
                    disabled={isResending || !isEmailValid}
                    className={`font-medium ${
                      isResending || !isEmailValid
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    {isResending ? 'Sending...' : 'Resend'}
                  </button>
                ) : (
                  <span className="text-gray-400">
                    {resendCooldown > 0 
                      ? `Resend in ${formatTime(resendCooldown)}`
                      : `Daily limit reached (${resendCount}/${MAX_DAILY_RESENDS})`
                    }
                  </span>
                )}
              </p>
              
              {/* Usage Counter */}
              {/* {resendCount > 0 && resendCount < MAX_DAILY_RESENDS && (
                <p className="text-xs text-gray-400 mt-1">
                  {resendCount}/{MAX_DAILY_RESENDS} resends used today
                </p>
              )} */}
            </div>

            {/* Help Text */}
            <div className="text-center mt-6 max-w-md">
              <p className="text-xs text-gray-400">
                Check your spam/junk folder if you don't see the email in your inbox.
                The verification link will expire in 24 hours.
              </p>
            </div>
          </>
        )}
          </div>
        </div>
      );
    };

export default VerifyEmail