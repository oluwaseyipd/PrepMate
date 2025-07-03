import React, {useState} from 'react';
import { FaLock } from 'react-icons/fa';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import logo from '../../assets/images/logo.png';
import fgpass from '../../assets/images/fgpass.png';
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touchedFields, setTouchedFields] = useState({});

    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    // Password validation rules
    const validatePassword = (password) => {
        const errors = [];
        
        if (!password) {
            return ['Password is required'];
        }
        
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            errors.push('Password must contain at least one special character (@$!%*?&)');
        }
        
        if (password.length > 128) {
            errors.push('Password must not exceed 128 characters');
        }
        
        // Check for common weak patterns
        if (/(.)\1{2,}/.test(password)) {
            errors.push('Password should not contain repeated characters');
        }
        
        return errors;
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};
        
        // Validate new password
        const passwordErrors = validatePassword(formData.newPassword);
        if (passwordErrors.length > 0) {
            newErrors.newPassword = passwordErrors;
        }
        
        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = ['Please confirm your password'];
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = ['Passwords do not match'];
        }
        
        return newErrors;
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        // Prevent spaces in password fields
        if (value.includes(' ')) {
            return;
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear errors for the field being edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
        
        // Real-time validation for better UX
        if (touchedFields[name]) {
            const newErrors = validateForm();
            if (name === 'newPassword') {
                const passwordErrors = validatePassword(value);
                if (passwordErrors.length > 0) {
                    setErrors(prev => ({ ...prev, newPassword: passwordErrors }));
                } else {
                    setErrors(prev => ({ ...prev, newPassword: undefined }));
                }
            }
            
            if (name === 'confirmPassword' && formData.newPassword) {
                if (value !== formData.newPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: ['Passwords do not match'] }));
                } else {
                    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                }
            }
        }
    };

    // Handle field blur
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouchedFields(prev => ({ ...prev, [name]: true }));
        
        // Validate on blur
        const newErrors = validateForm();
        setErrors(newErrors);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Mark all fields as touched
        setTouchedFields({
            newPassword: true,
            confirmPassword: true
        });
        
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            // Focus on first error field
            const firstErrorField = Object.keys(formErrors)[0];
            document.querySelector(`[name="${firstErrorField}"]`)?.focus();
            return;
        }
        
        setIsSubmitting(true);
        setErrors({});
        
        try {
            // Your API call here
            console.log('Password reset data:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Handle success (redirect, show success message, etc.)
            alert('Password reset successfully!');
            
        } catch (error) {
            console.error('Password reset failed:', error);
            setErrors({
                submit: ['Failed to reset password. Please try again.']
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Password strength indicator
    const getPasswordStrength = (password) => {
        if (!password) return { strength: 0, label: '' };
        
        const errors = validatePassword(password);
        if (errors.length === 0) return { strength: 100, label: 'Strong' };
        if (errors.length <= 2) return { strength: 75, label: 'Good' };
        if (errors.length <= 4) return { strength: 50, label: 'Fair' };
        return { strength: 25, label: 'Weak' };
    };

    const passwordStrength = getPasswordStrength(formData.newPassword);
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
  
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                        {/* Submit Error */}
                        {errors.submit && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                                {errors.submit[0]}
                            </div>
                        )}

                        {/* New Password Field */}
                        <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                New Password *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`block w-full pl-10 pr-10 py-3 border ${
                                        errors.newPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 
                                        'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    } rounded-md focus:outline-none focus:ring-1 text-gray-800 sm:text-sm`}
                                    placeholder="Enter your new password"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePassword}
                                    disabled={isSubmitting}
                                >
                                    {showPassword ? 
                                        <IoEyeOffOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                                        <IoEyeOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    }
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {formData.newPassword && (
                                <div className="mt-2">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-500">Password strength:</span>
                                        <span className={`font-medium ${
                                            passwordStrength.strength >= 75 ? 'text-green-600' :
                                            passwordStrength.strength >= 50 ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${
                                                passwordStrength.strength >= 75 ? 'bg-green-500' :
                                                passwordStrength.strength >= 50 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Password Errors */}
                            {errors.newPassword && (
                                <div className="mt-2 space-y-1">
                                    {errors.newPassword.map((error, index) => (
                                        <p key={index} className="text-sm text-red-600 flex items-center">
                                            <span className="mr-1">•</span>
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password *
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`block w-full pl-10 pr-10 py-3 border ${
                                        errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 
                                        'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                    } rounded-md focus:outline-none focus:ring-1 text-gray-800 sm:text-sm`}
                                    placeholder="Confirm your new password"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={toggleConfirmPassword}
                                    disabled={isSubmitting}
                                >
                                    {showConfirmPassword ? 
                                        <IoEyeOffOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                                        <IoEyeOutline className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                    }
                                </button>
                            </div>
                            
                            {/* Confirm Password Errors */}
                            {errors.confirmPassword && (
                                <div className="mt-2">
                                    {errors.confirmPassword.map((error, index) => (
                                        <p key={index} className="text-sm text-red-600">
                                            {error}
                                        </p>
                                    ))}
                                </div>
                            )}
                            
                            {/* Match Indicator */}
                            {formData.confirmPassword && formData.newPassword && (
                                <div className="mt-2">
                                    <p className={`text-sm ${
                                        formData.newPassword === formData.confirmPassword ? 
                                        'text-green-600' : 'text-red-600'
                                    }`}>
                                        {formData.newPassword === formData.confirmPassword ? 
                                            '✓ Passwords match' : '✗ Passwords do not match'}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting || Object.keys(errors).length > 0}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Setting New Password...
                                    </div>
                                ) : (
                                    'Set New Password'
                                )}
                            </button>
                        </div>

                        {/* Back to Login Link */}
                        <div className="text-center">
                            <Link 
                                to="/login" 
                                className="text-blue-600 hover:text-blue-500 text-sm font-medium transition-colors duration-200"
                            >
                                ← Back To Login
                            </Link>
                        </div>
                    </form>
        </div>
      </div>
    );
  };
  

export default ResetPassword