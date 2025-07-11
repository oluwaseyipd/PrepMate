
import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Chatbot from './Chatbot';

// optional – only used by student dashboard features
import { useModal } from '../../context/ModalContext';
import { useTestResult } from '../../context/TestResultContext';
import { useTestHistory } from '../../context/TestHistoryContext';
import submitalert from '../../assets/images/are-you-sure.png';

import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../constants/roles';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  // role
  const { role } = useAuth();
  const isUser = role === ROLES.USER;

  // ---------- student‑only hooks ----------
  const {
    showSubmitAlert = false,
    setShowSubmitAlert = () => {},
    showCancelAlert = false,
    setShowCancelAlert = () => {},
    showStartTestPrompt = {},
    setShowStartTestPrompt = () => {},
  } = isUser ? useModal() : {};

  const { testResult } = isUser ? useTestResult() : { testResult: null };
  const { addCompletedTest = () => {} } = isUser ? useTestHistory() : {};
  const navigate = useNavigate();

  // ---------- helper fns (user only) ----------
  const finishTest = (completedCourse) => {
    try {
      const stored = JSON.parse(localStorage.getItem('taketest')) || [];
      const idx = stored.findIndex((c) => c.testId === completedCourse.testId);
      if (idx >= 0) stored[idx] = completedCourse;
      else stored.push(completedCourse);
      localStorage.setItem('taketest', JSON.stringify(stored));
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalSubmit = () => {
    if (!isUser) return;
    if (testResult) {
      addCompletedTest(testResult);
      finishTest(testResult);
      setShowSubmitAlert(false);
      navigate('/dashboard/testsummary');
    } else {
      setShowSubmitAlert(false);
    }
  };

  const handleStartTestConfirm = () => {
    if (!isUser) return;
    setShowStartTestPrompt({ show: false, courseId: null, onConfirm: null });
    if (
      showStartTestPrompt.onConfirm &&
      typeof showStartTestPrompt.onConfirm === 'function'
    ) {
      showStartTestPrompt.onConfirm();
    } else {
      navigate('/dashboard/testinterface', {
        state: { courseId: showStartTestPrompt.courseId },
      });
    }
  };

  // ---------- JSX ----------
  return (
    <div className="relative flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-50 h-full`}
      >
        <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        {/* Chatbot only for learners */}
        {isUser && <Chatbot />}

        <main className="relative flex-1 p-3 md:p-6 overflow-y-auto h-full">
          <Outlet />

          {/* user‑only modals */}
          {isUser && (
            <>
              {/* Start Test */}
              {showStartTestPrompt.show && (
                <div className="absolute inset-0 z-40 flex justify-center items-center bg-transparent bg-opacity-30 backdrop-blur-sm">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] md:w-[500px]">
                    <img src={submitalert} alt="Start" className="w-40 mx-auto" />
                    <p className="text-center text-black mt-4">Are you sure you want to start the test?</p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowStartTestPrompt({ show: false, courseId: null, onConfirm: null })}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleStartTestConfirm}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Test */}
              {showSubmitAlert && (
                <div className="absolute inset-0 z-40 flex justify-center items-center bg-transparent bg-opacity-30 backdrop-blur-sm">
                  <div className="bg-white p-6 rounded-xl shadow-lg w-[300px] md:w-[500px]">
                    <img src={submitalert} alt="Submit" className="w-40 mx-auto" />
                    <p className="text-center text-black mt-4">Are you sure you want to submit the test?</p>
                    <div className="flex justify-end gap-4 mt-6">
                      <button
                        onClick={() => setShowSubmitAlert(false)}
                        className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleFinalSubmit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-full"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Cancel Alert */}
              {showCancelAlert && (
                <div className="absolute inset-0 z-50 flex justify-center items-center bg-transparent bg-opacity-30 backdrop-blur-sm">
                  <div className="flex flex-col justify-center items-center w-[300px] md:w-[600px] bg-white p-5 rounded-xl shadow-lg">
                    <img src={submitalert} className="w-40 mx-auto" alt="Cancel" />
                    <p className="text-black text-center mt-4">If you leave this page, your work will not be saved or submitted. Are you sure?</p>
                    <div className="flex items-center justify-end gap-10 my-5">
                      <button
                        onClick={() => setShowCancelAlert(false)}
                        className="bg-white border border-red-600 text-red-600 hover:bg-red-600 hover:text-white py-2 px-4 rounded-full"
                      >
                        Continue
                      </button>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                        onClick={() => navigate(-1)}
                      >
                        Leave
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
