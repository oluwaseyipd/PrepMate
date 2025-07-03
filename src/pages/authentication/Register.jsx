import React, { useState } from 'react';
import { FaFacebook, FaGoogle, FaXTwitter, FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaCheck, FaXmark } from 'react-icons/fa6';
import logo from '../../assets/images/logo.png';
import register from '../../assets/images/register.png';
import { Link } from "react-router-dom";

const Register = () => {

    const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
    agreeToTerms: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Password strength checker
  const getPasswordStrength = (password) => {
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    score = Object.values(checks).filter(Boolean).length;
    
    return {
      score,
      checks,
      strength: score < 3 ? 'weak' : score < 4 ? 'medium' : 'strong'
    };
  };

  // Validation functions
  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3) return 'Username must be at least 3 characters long';
    if (username.length > 20) return 'Username must be less than 20 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return 'Username can only contain letters, numbers, and underscores';
    }
    if (/^\d/.test(username)) return 'Username cannot start with a number';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    if (email.length > 254) return 'Email address is too long';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters long';
    if (password.length > 128) return 'Password is too long';
    
    const strength = getPasswordStrength(password);
    if (strength.score < 3) {
      return 'Password is too weak. Include uppercase, lowercase, numbers, and special characters';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== password) return 'Passwords do not match';
    return '';
  };

  // Real-time validation
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'username':
        error = validateUsername(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        // Also revalidate confirm password if it exists
        if (formData.confirmPassword) {
          const confirmError = validateConfirmPassword(formData.confirmPassword, value);
          setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
        }
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value, formData.password);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear specific validation errors when user starts typing
    if (errors[name] && name !== 'rememberMe' && name !== 'agreeToTerms') {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Validate field if it has been touched
    if (touched[name] && name !== 'rememberMe' && name !== 'agreeToTerms') {
      setTimeout(() => validateField(name, fieldValue), 300); // Debounce validation
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    if (name !== 'rememberMe' && name !== 'agreeToTerms') {
      validateField(name, value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    const usernameError = validateUsername(formData.username);
    if (usernameError) newErrors.username = usernameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError;
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mark all fields as touched
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      agreeToTerms: true
    });

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Registration data:', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe
      });
      
      // Handle successful registration here
      alert('Registration successful!');
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Registration failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Register with ${provider}`);
    // Handle social registration here
  };

  const passwordStrength = getPasswordStrength(formData.password);

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
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username *</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}>
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Type your username"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.username ? 'true' : 'false'}
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
            </div>
            {errors.username && (
              <p id="username-error" className="text-red-500 text-sm mt-1">
                {errors.username}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email *</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}>
              <FaEnvelope className="text-gray-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Type your email address"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password *</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}>
              <FaLock className="text-gray-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="********"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'password-error password-help' : 'password-help'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex space-x-1 mb-2">
                  <div className={`h-1 w-1/3 rounded ${
                    passwordStrength.score >= 1 ? 
                    (passwordStrength.strength === 'weak' ? 'bg-red-500' : 
                     passwordStrength.strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') 
                    : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-1 w-1/3 rounded ${
                    passwordStrength.score >= 3 ? 
                    (passwordStrength.strength === 'medium' ? 'bg-yellow-500' : 'bg-green-500') 
                    : 'bg-gray-300'
                  }`}></div>
                  <div className={`h-1 w-1/3 rounded ${
                    passwordStrength.score >= 5 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className={`flex items-center ${passwordStrength.checks.length ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordStrength.checks.length ? <FaCheck className="mr-1" /> : <FaXmark className="mr-1" />}
                    8+ characters
                  </div>
                  <div className={`flex items-center ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordStrength.checks.uppercase ? <FaCheck className="mr-1" /> : <FaXmark className="mr-1" />}
                    Uppercase
                  </div>
                  <div className={`flex items-center ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordStrength.checks.lowercase ? <FaCheck className="mr-1" /> : <FaXmark className="mr-1" />}
                    Lowercase
                  </div>
                  <div className={`flex items-center ${passwordStrength.checks.number ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordStrength.checks.number ? <FaCheck className="mr-1" /> : <FaXmark className="mr-1" />}
                    Number
                  </div>
                  <div className={`flex items-center ${passwordStrength.checks.special ? 'text-green-600' : 'text-gray-500'}`}>
                    {passwordStrength.checks.special ? <FaCheck className="mr-1" /> : <FaXmark className="mr-1" />}
                    Special char
                  </div>
                </div>
              </div>
            )}
            
            {errors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Confirm Password *</label>
            <div className={`flex items-center border rounded-lg px-3 py-2 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            }`}>
              <FaLock className="text-gray-500" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Checkboxes */}
          <div className="mb-4">
            <div className="mb-2">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700 cursor-pointer">
                Remember Me
              </label>
            </div>
            
            <div className="mb-2">
              <input
                type="checkbox"
                id="terms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label htmlFor="terms" className="text-gray-700 cursor-pointer">
                I agree to the{' '}
                <button
                  type="button"
                  onClick={() => console.log('Terms clicked')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Terms and Conditions
                </button>
                {' '}and{' '}
                <button
                  type="button"
                  onClick={() => console.log('Privacy clicked')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-sm">
                {errors.agreeToTerms}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
            }`}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

             <p className="mt-4 text-black">
          Already have an account?{' '}
          <button
            className="text-blue-600 hover:text-blue-700"
          >
            <Link to='/signin'>Log In</Link> 
          </button>
        </p>

        <div className="mt-4 flex items-center w-full max-w-sm">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Registration Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            onClick={() => handleSocialLogin('Google')}
            className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition cursor-pointer"
            aria-label="Sign up with Google"
          >
            <FaGoogle className="text-red-600 h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('Twitter')}
            className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer"
            aria-label="Sign up with Twitter"
          >
            <FaXTwitter className="text-blue-500 h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin('Facebook')}
            className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition cursor-pointer"
            aria-label="Sign up with Facebook"
          >
            <FaFacebook className="text-blue-700 h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
