import React, { useState } from "react";
import {
  FaXTwitter,
  FaFacebook,
  FaGoogle,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa6";
import logo from "../../assets/images/logo.png";
import signin from "../../assets/images/signin.png";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    // Username should be 3-20 characters, alphanumeric and underscores only
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

  const validateEmailOrUsername = (value) => {
    if (!value) return "Email or username is required";

    // Check if it contains @ symbol (likely email)
    if (value.includes("@")) {
      if (!validateEmail(value)) {
        return "Please enter a valid email address";
      }
    } else {
      // Treat as username
      if (!validateUsername(value)) {
        return "Username must be 3-20 characters long and contain only letters, numbers, and underscores";
      }
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return "";
  };

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "emailOrUsername":
        error = validateEmailOrUsername(value);
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Validate field if it has been touched
    if (touched[name] && name !== "rememberMe") {
      validateField(name, fieldValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  const validateForm = () => {
    const newErrors = {};

    const emailOrUsernameError = validateEmailOrUsername(
      formData.emailOrUsername
    );
    if (emailOrUsernameError) newErrors.emailOrUsername = emailOrUsernameError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    setTouched({
      emailOrUsername: true,
      password: true,
    });

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);
      
      // Simulate checking credentials
      const email = formData.emailOrUsername;
      let role = "user";

      if (email === "admin@prepmate.com") role = "admin";
      if (email === "superadmin@prepmate.com") role = "superadmin";

      localStorage.setItem("role", role);
      
      // Navigate based on role
      if (role === "admin") {
        navigate("/dashboard/admin/dashboard");
      } else if (role === "superadmin") {
        navigate("/dashboard/superadmin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ submit: "Login failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login here
  };

const handleDemoLogin = (role) => {
  localStorage.setItem("role", role);
  
  // Navigate based on role using React Router
  if (role === "admin") {
    navigate("/admin/dashboard");  // ← Changed to absolute path
  } else if (role === "superadmin") {
    navigate("/superadmin/dashboard");  // ← Changed to absolute path
  } else {
    navigate("/dashboard");
  }
};

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <img src={signin} alt="Study Illustration" className="w-3/4" />
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <img
          src={logo}
          alt="Study Illustration"
          className="w-30 md:w-60 mb-20"
        />
        <h1 className="text-3xl text-left font-bold text-gray-900 mb-2">
          Welcome Back! 👋
        </h1>
        <p className="text-gray-600 mb-6">
          Please sign in to your account and start the adventure
        </p>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          {/* Email or Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Email or Username *
            </label>
            <div
              className={`flex items-center rounded-lg px-3 py-2 border ${
                errors.emailOrUsername ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaUser className="text-gray-500" />
              <input
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Type your email or username"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.emailOrUsername ? "true" : "false"}
                aria-describedby={
                  errors.emailOrUsername ? "emailOrUsername-error" : undefined
                }
              />
            </div>
            {errors.emailOrUsername && (
              <p
                id="emailOrUsername-error"
                className="text-red-500 text-sm mt-1"
              >
                {errors.emailOrUsername}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Current Password *
            </label>
            <div
              className={`flex items-center rounded-lg px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            >
              <FaLock className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                placeholder="Type your password"
                className="w-full ml-2 outline-none text-black"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-6">
            <div className="cursor-pointer">
              <input
                type="checkbox"
                id="remember"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label
                htmlFor="remember"
                className="text-gray-700 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-700">
              Forgot Password?
            </Link>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Demo Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-6">
          <button
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
            onClick={() => handleDemoLogin("user")}
            disabled={isSubmitting}
          >
            Login as User
          </button>

          <button
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 cursor-pointer"
            }`}
            onClick={() => handleDemoLogin("admin")}
            disabled={isSubmitting}
          >
            Login as Admin
          </button>

          <button
            className={`w-full py-3 rounded-lg text-white font-medium transition ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700 cursor-pointer"
            }`}
            onClick={() => handleDemoLogin("superadmin")}
            disabled={isSubmitting}
          >
            Login as Super Admin
          </button>
        </div>

        <p className="mt-4 text-black">
          New on our platform?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Create an account
          </Link>
        </p>

        <div className="mt-4 flex items-center w-full max-w-sm">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-600">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            onClick={() => handleSocialLogin("Google")}
            className="p-3 bg-red-100 rounded-lg hover:bg-red-200 transition cursor-pointer"
            aria-label="Sign in with Google"
          >
            <FaGoogle className="text-red-600 h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Twitter")}
            className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer"
            aria-label="Sign in with Twitter"
          >
            <FaXTwitter className="text-blue-500 h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => handleSocialLogin("Facebook")}
            className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition cursor-pointer"
            aria-label="Sign in with Facebook"
          >
            <FaFacebook className="text-blue-700 h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;