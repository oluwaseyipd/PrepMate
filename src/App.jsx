import React, { useState, useEffect } from "react";
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

// Users Dashboard Pages
import Overview from "./pages/userDashboard/Overview";
import AllCourses from "./pages/userDashboard/AllCourses";
import MyCourses from "./pages/userDashboard/MyCourses";
import Analytics from "./pages/userDashboard/Analytics";
import Resources from "./pages/userDashboard/Resources";
import TakeTest from "./pages/userDashboard/TakeTest";
import AccountSettings from "./pages/userDashboard/AccountSettings";
import Tests from "./pages/userDashboard/Tests";
import CourseDetails from "./pages/userDashboard/CourseDetails";
import MyCourseDetails from "./pages/userDashboard/MyCourseDetails";
import TestInterface from "./pages/userDashboard/TestInterface";
import TestSummary from "./pages/userDashboard/TestSummary";

// Admin Dashboard Pages
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AdminAnalytics from "./pages/adminDashboard/AdminAnalytics";
import AdminAccountSettings from "./pages/adminDashboard/AdminAccountSettings";
import ResourceLibrary from "./pages/adminDashboard/ResourceLibrary";
import ManageResources from "./pages/adminDashboard/ManageResources";
import ManageTests from "./pages/adminDashboard/ManageTests";
import ManageUsers from "./pages/adminDashboard/ManageUsers";
import CreateTest from "./pages/adminDashboard/CreateTest";

// Layout Pages
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

// Components
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

// Contexts
import { ModalProvider } from "./context/ModalContext";
// import { TestResultProvider } from "./context/TestResultContext";

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
        // <TestResultProvider>
        <ModalProvider>
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
              <Route path="takeatest" element={<TakeTest />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="tests" element={<Tests />} />
              <Route path="coursedetails/:id" element={<CourseDetails />} />
              <Route path="mycoursedetails/:id" element={<MyCourseDetails />} />
              <Route path="testinterface" element={<TestInterface />} />
              <Route path="testsummary" element={<TestSummary/>} />
            </Route>

            {/* Admin Dashboard Routes */}
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminAccountSettings />} />
              <Route path="resources" element={<ResourceLibrary />} />
              <Route path="manageresources" element={<ManageResources />} />
              <Route path="managetests" element={<ManageTests />} />
              <Route path="manageusers" element={<ManageUsers />} />
              <Route path="createtest" element={<CreateTest />} />
            </Route>

            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
         </ModalProvider>
        //  </TestResultProvider>
      )}
    </>
  );
}

export default App;
