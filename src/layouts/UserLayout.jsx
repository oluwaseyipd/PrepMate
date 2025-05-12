import React, { useState } from 'react';
import Sidebar from '../components/userDashboard/Sidebar';
import Header from '../components/userDashboard/Header';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useModal } from "../context/ModalContext";
import { useTestResult } from "../context/TestResultContext";
import { useTestHistory } from "../context/TestHistoryContext";
import submitalert from "../assets/images/are-you-sure.png";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showSubmitAlert, setShowSubmitAlert } = useModal();
  const { showCancelAlert, setShowCancelAlert } = useModal();
  const { showStartTestPrompt, setShowStartTestPrompt } = useModal();
  const { testResult } = useTestResult(); // Get the current testResult
  const { addCompletedTest } = useTestHistory();

  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to add the completed course to localStorage (taketest array)
  const finishTest = (completedCourse) => {
    try {
      const storedCourses = JSON.parse(localStorage.getItem('taketest')) || [];
      
      // Check if the course already exists in the array
      const existingIndex = storedCourses.findIndex(course => course.testId === completedCourse.testId);
      
      // If it exists, update it; otherwise, add it
      if (existingIndex >= 0) {
        storedCourses[existingIndex] = completedCourse;
      } else {
        storedCourses.push(completedCourse);
      }
      
      localStorage.setItem('taketest', JSON.stringify(storedCourses));
      console.log("Test saved to localStorage successfully");
      
      // Add the completed course to submittedTests for display in TakeTest.js
      addCompletedCourseToTakeTest(completedCourse);
    } catch (error) {
      console.error("Error saving test to localStorage:", error);
    }
  };
  
  // Function to add course to submittedTests in localStorage for TakeTest.js
  const addCompletedCourseToTakeTest = (testResult) => {
    try {
      // Get the course details from myCourses
      const myCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
      const courseDetails = myCourses.find(course => course.id === testResult.testId);
      
      if (!courseDetails) {
        console.error("Course details not found for testId:", testResult.testId);
        return;
      }
      
      // Get existing submitted tests
      const submittedTests = JSON.parse(localStorage.getItem('submittedTests')) || [];
      
      // Check if this test is already in the submitted list
      const existingIndex = submittedTests.findIndex(course => course.id === courseDetails.id);
      
      // If it exists, update it; otherwise, add it
      if (existingIndex >= 0) {
        submittedTests[existingIndex] = courseDetails;
      } else {
        submittedTests.push(courseDetails);
      }
      
      // Save back to localStorage
      localStorage.setItem('submittedTests', JSON.stringify(submittedTests));
      console.log("Course added to submittedTests successfully");
    } catch (error) {
      console.error("Error adding course to submittedTests:", error);
    }
  };

  // Handling the final submission  
  const handleFinalSubmit = () => {
    // Use the existing test result that was already set in TestInterface.js
    if (testResult) {
      console.log("Processing test result:", testResult);
      
      // Add to context-managed test history
      if (typeof addCompletedTest === 'function') {
        addCompletedTest(testResult);
      } else {
        console.warn("addCompletedTest is not a function");
      }

      // Save to localStorage
      finishTest(testResult);

      setShowSubmitAlert(false);
      console.log("Navigating to summary...");
      navigate("/dashboard/testsummary");
    } else {
      console.error("No test result found in context!");
      setShowSubmitAlert(false);
    }
  };

  // Handle test start confirmation
  const handleStartTestConfirm = () => {
    // Reset the modal state
    setShowStartTestPrompt({
      show: false,
      courseId: null,
      onConfirm: null
    });
    
    // Call the onConfirm function if it exists
    if (showStartTestPrompt.onConfirm && typeof showStartTestPrompt.onConfirm === 'function') {
      showStartTestPrompt.onConfirm();
    } else {
      // Fallback to the original behavior if no function is provided
      navigate("/dashboard/testinterface", { 
        state: { courseId: showStartTestPrompt.courseId }
      });
    }
  };

  return (
    <div className="relative flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-50`}>
        <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="relative flex-1 p-3 md:p-6 overflow-y-auto h-full">
          <Outlet /> {/* This is where all your pages will show automatically */}

          {/* Start test Message */}
          {showStartTestPrompt.show && (
            <div className="absolute inset-0 z-40 flex justify-center items-center bg-transparent bg-opacity-30 shadow-xl backdrop-blur-sm transition-all duration-300">
              <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] md:w-[500px]">
                <img src={submitalert} alt="Start" className="w-40 mx-auto" />
                <p className="text-center text-black mt-4">
                  Are you sure you want to start the test?
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowStartTestPrompt({
                      show: false,
                      courseId: null,
                      onConfirm: null
                    })}
                    className="border border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleStartTestConfirm}
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full"
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Message */}
          {showSubmitAlert && (
            <div className="absolute inset-0 z-40 flex justify-center items-center bg-transparent bg-opacity-30 shadow-xl backdrop-blur-sm transition-all duration-300">
              <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] md:w-[500px]">
                <img src={submitalert} alt="Submit" className="w-40 mx-auto" />
                <p className="text-center text-black mt-4">
                  Are you sure you want to submit the test?
                </p>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowSubmitAlert(false)}
                    className="border border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinalSubmit} // Call handleFinalSubmit here
                    className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cancel Message */}
          {showCancelAlert && (
            <div className="absolute inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-30 shadow-xl backdrop-blur-sm transition-all ease-out duration-500">
              <div className="flex flex-col justify-center items-center w-[300px] md:w-[600px] bg-white p-5 rounded-xl shadow-lg scale-100 opacity-100 animate-fade-in">
                <img src={submitalert} className="w-40 mx-auto" alt="" />
                <p className="text-black text-center mt-4">
                  If you leave this page, your work will not be saved or submitted. Are you sure?
                </p>
                <div className="flex items-center justify-end gap-10 my-5">
                  <button
                    onClick={() => setShowCancelAlert(false)}
                    className="bg-white hover:bg-red-600 text-red-600 hover:text-white border border-red-600 font-bold py-2 px-4 cursor-pointer rounded-full"
                  >
                    Continue
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded-full">
                    Leave
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;