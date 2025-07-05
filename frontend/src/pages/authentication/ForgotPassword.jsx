import React, { useState } from "react";
import {
  FaFacebook,
  FaGoogle,
  FaXTwitter,
  FaEnvelope,
  FaCircle,
  FaTriangleExclamation,
} from "react-icons/fa6";
import logo from "../../assets/images/logo.png";
import fgpass from "../../assets/images/fgpass.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // Email validation function
  const validateEmail = (email) => {
    if (!email) return "Email address is required";

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";

    // Check for common email format issues
    if (email.length > 254) return "Email address is too long";
    if (email.startsWith(".") || email.endsWith("."))
      return "Email cannot start or end with a dot";
    if (email.includes("..")) return "Email cannot contain consecutive dots";

    // Check for valid domain
    const domain = email.split("@")[1];
    if (domain && domain.length < 2) return "Please enter a valid email domain";

    return "";
  };

  // Real-time validation
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      error = validateEmail(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear success state when user starts typing again
    if (isSuccess) {
      setIsSuccess(false);
    }

    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Validate field if it has been touched or submit was attempted
    if (touched[name] || submitAttempted) {
      setTimeout(() => validateField(name, value), 300); // Debounce validation
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
    const emailError = validateEmail(formData.email);
    const newErrors = {};

    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitAttempted(true);

    // Mark field as touched
    setTouched({ email: true });

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Password reset requested for:", formData.email);

      // Handle successful password reset request
      setIsSuccess(true);
      setFormData({ email: "" }); // Clear form on success
      setTouched({});
      setSubmitAttempted(false);
    } catch (error) {
      console.error("Password reset error:", error);

      // Handle different types of errors
      if (error.response?.status === 404) {
        setErrors({ email: "No account found with this email address" });
      } else if (error.response?.status === 429) {
        setErrors({
          submit: "Too many reset attempts. Please try again later.",
        });
      } else {
        setErrors({ submit: "Failed to send reset email. Please try again." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login here
  };

  const handleResendEmail = () => {
    setIsSuccess(false);
    // Optionally pre-fill the email if you want to keep it
  };

  return (
    <div className="flex h-screen">
      {/* Left Side with Image */}
      <div className="hidden md:flex w-1/2 bg-blue-50 justify-center items-center">
        <img src={fgpass} alt="Password Reset Illustration" className="w-3/4" />
      </div>

      {/* Right Side - Forgot Password Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-8">
        <img src={logo} alt="" className="w-30 md:w-60 mb-20" />

        {/* Success State */}
        {isSuccess ? (
          <div className="w-full max-w-sm text-center">
            <div className="mb-6">
              <FaCircle className="text-green-500 text-6xl mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Check Your Email
              </h1>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to your email address. Please
                check your inbox and follow the instructions to reset your
                password.
              </p>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleResendEmail}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Send Another Email
              </button>

              <button
                type="button"
                onClick={() => console.log("Navigate to signin")}
                className="w-full text-blue-600 hover:text-blue-700 py-2"
              >
                ← Back to Login
              </button>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <FaTriangleExclamation className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Didn't receive the email?</p>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700">
                    <li>Check your spam/junk folder</li>
                    <li>Make sure the email address is correct</li>
                    <li>Wait a few minutes and check again</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Form State */
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-left">
              Forgot Password?
            </h1>
            <p className="text-gray-600 mb-6 text-center md:w-[410px]">
              Lost your password? Please enter your email address. You will
              receive a link to create a new password via email.
            </p>

            <form className="w-full max-w-sm">
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Email Address *
                </label>
                <div
                  className={`flex items-center border rounded-lg px-3 py-3 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <FaEnvelope className="text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email address"
                    className="w-full ml-2 outline-none text-black"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={
                      errors.email ? "email-error" : "email-help"
                    }
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
                )}
                <p id="email-help" className="text-gray-500 text-sm mt-1">
                  Enter the email address associated with your account
                </p>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <div className="flex items-center">
                    <FaTriangleExclamation className="mr-2" />
                    {errors.submit}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.email.trim()}
                className={`w-full py-3 mb-6 rounded-lg text-white font-medium transition ${
                  isSubmitting || !formData.email.trim()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Reset Link...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 mb-4"
            >
              <Link to="/signin">← Back to Login</Link>
            </button>

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
                aria-label="Login with Google"
              >
                <FaGoogle className="text-red-600 h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Twitter")}
                className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                aria-label="Login with Twitter"
              >
                <FaXTwitter className="text-blue-500 h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition cursor-pointer"
                aria-label="Login with Facebook"
              >
                <FaFacebook className="text-blue-700 h-6 w-6" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
