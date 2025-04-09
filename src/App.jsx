import React from "react";
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Authentication Pages
import SignIn from "./pages/authentication/SignIn";
import Register from "./pages/authentication/Register";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import TwoStepVerification from "./pages/authentication/TwoStepVerification";
import VerifyEmail from "./pages/authentication/VerifyEmail";

// Dashboards Pages
import Overview from "./pages/userDashboard/Overview";
import AllCourses from "./pages/userDashboard/AllCourses";
import MyCourses from "./pages/userDashboard/MyCourses";
import Analytics from "./pages/userDashboard/Analytics";
import Resources from "./pages/userDashboard/Resources";
import AccountSettings from "./pages/userDashboard/AccountSettings";
import Tests from "./pages/userDashboard/Tests";
import CourseDetails from "./pages/userDashboard/CourseDetails";

// Layout Pages
import UserLayout from "./layouts/UserLayout";

// Components
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/two-step-verification" element={<TwoStepVerification />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* User Dashboard Routes */}
            <Route path="/dashboard/*" element={<UserLayout />}>
              <Route index element={<Overview />} />
              <Route path="overview" element={<Overview />} />
              <Route path="allcourses" element={<AllCourses />} />
              <Route path="mycourses" element={<MyCourses />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="resources" element={<Resources />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="tests" element={<Tests />} />
              <Route path="coursedetails" element={<CourseDetails />} />
            </Route>


            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
