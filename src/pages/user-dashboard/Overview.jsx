import React from "react";
import Sidebar from "../../components/user-dashboard/Sidebar";
import QuickStats from "../../components/user-dashboard/QuickStats";
import { recentTests } from "../../constants/user";

const Overview = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 transition-all duration-300 overflow-auto">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Welcome Section */}
          <div className="bg-blue-100 p-6 rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Welcome, John Oluwaseyi!</h2>
            <p className="text-gray-700">We're glad to have you back. Start practicing to improve your performance.</p>
          </div>

          {/* Quick Stats Section */}
          <QuickStats />

          {/* Recent Test Results Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md md:col-span-2">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Recent Test Results</h2>
            <div className="grid grid-cols-4 gap-6 mb-4 font-bold text-blue-900">
              <div>Subject</div>
              <div>Date</div>
              <div>Test Duration</div>
              <div>Score</div>
            </div>
            <hr className="my-4 border-b border-gray-200" />
            <ul className="space-y-4">
              {recentTests.map((test, index) => (
                <li key={index} className="grid grid-cols-4 gap-5 items-center p-4">
                  <span className="text-black">{test.subject}</span>
                  <span className="text-black">{test.date}</span>
                  <span className="text-black">{test.duration}</span>
                  <span className="font-bold text-blue-600">{test.score}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Leaderboard Preview Section */}
          <div className="bg-white p-6 rounded-2xl shadow-md md:col-span-2">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Leaderboard Preview</h2>
            <div className="grid grid-cols-3 gap-6 mb-4 font-bold text-blue-900">
              <div>Rank</div>
              <div>Name</div>
              <div>Score</div>
            </div>
            <hr className="my-4 border-b border-gray-200" />
            <ul className="space-y-4">
              <li className="grid grid-cols-3 gap-5 items-center p-4 bg-blue-50 rounded-lg shadow-sm">
                <span className="text-black">1</span>
                <span className="text-black">John Oluwaseyi</span>
                <span className="font-bold text-blue-600">95%</span>
              </li>
              <li className="grid grid-cols-3 gap-5 items-center p-4 bg-blue-50 rounded-lg shadow-sm">
                <span className="text-black">2</span>
                <span className="text-black">Jane Doe</span>
                <span className="font-bold text-blue-600">90%</span>
              </li>
              <li className="grid grid-cols-3 gap-5 items-center p-4 bg-blue-50 rounded-lg shadow-sm">
                <span className="text-black">3</span>
                <span className="text-black">Alex Smith</span>
                <span className="font-bold text-blue-600">88%</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Overview;
