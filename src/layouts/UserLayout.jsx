import React, { useState } from 'react';
import Sidebar from '../components/userDashboard/Sidebar';
import Header from '../components/userDashboard/Header';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useModal } from "../context/ModalContext";
import { useTestResult } from "../context/TestResultContext";
import { testquestions } from "../constants/testquestion";
import submitalert from "../assets/images/are-you-sure.png";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { showSubmitAlert, setShowSubmitAlert } = useModal();
  const { showCancelAlert, setShowCancelAlert } = useModal();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const { setTestResult } = useTestResult();

  const handleTestSubmit = () => {
    const endTime = Date.now();
    const durationInMs = endTime - startTime; // Get startTime from earlier
    const duration = Math.floor(durationInMs / 60000) + " mins";
  
    const correct = userAnswers.filter((ans, idx) => {
      return ans.selected === testquestions[idx].answer;
    }).length;
  
    const totalQuestions = testquestions.length;
    const incorrect = totalQuestions - correct;
    const score = Math.round((correct / totalQuestions) * 100);
  
    setTestResult({
      title: "General Knowledge Test", // or dynamic
      date: new Date().toLocaleDateString(),
      duration,
      totalQuestions,
      correct,
      incorrect,
      score,
    });
  };

  // Handling the final submission  
  const handleFinalSubmit = () => {
    handleTestSubmit(); // sets result
    setShowSubmitAlert(false);
    navigate("/dashboard/testsummary");
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


     {/* Modal appears only over the main content */}
     {showSubmitAlert && (
            <div className="absolute inset-0 z-40 flex justify-center items-center bg-transparent bg-opacity-30 shadow-xl  backdrop-blur-sm transition-all duration-300">
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
                  <Link to={"/dashboard/testsummary"}
                   onClick={handleFinalSubmit}
                  
                  className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full">
                    Submit
                  </Link>
                </div>
              </div>
            </div>
          )}

      
            {/* Cancel Message */}
            {showCancelAlert && (
        <div className="absolute inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-30 shadow-xl backdrop-blur-sm transition-all ease-out duration-500">
          <div className="flex flex-col justify-center items-center w-[300px]  md:w-[600px] bg-white p-5 rounded-xl shadow-lg scale-100 opacity-100 animate-fade-in">
            <img src={submitalert} className="w-40 mx-auto" alt="" />
            <p className="text-black text-center mt-4">
              If you leave this page, your work will not be saved or submitted. Are you sure?
            </p>
            <div className="flex items-center justify-end gap-10 my-5">
              <button 
              onClick={() => setShowCancelAlert(false)}
              className="bg-white hover:bg-red-600 text-red-600 hover:text-white border border-red-600 font-bold py-2 px-4 cursor-pointer rounded-full">
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
