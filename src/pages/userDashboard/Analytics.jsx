import React from "react";
import { ArrowDown, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import RevenueStat from "../../components/charts/RevenueStat";
import StudyStat from "../../components/charts/StudyStat";
import TestScoreGraph from "../../components/charts/TestScoreGraph";
import weakTopics from "../../components/charts/WeakTopics";
import {
  FaTriangleExclamation,
  FaHouse,
  FaUserGroup,
  FaFire,
  FaChartLine,
  FaChartBar,
  FaClock,
  FaAward,
  FaSignal,
} from "react-icons/fa6";
import WeakTopics from "../../components/charts/WeakTopics";
import Leaderboard from "../../components/charts/LeaderBoard";

const Analytics = () => {
  return (
    <div className="p-6">
      {/* Heading */}
      <div className="flex items-center gap-3 text-gray-700 mb-5">
        <h1 className="text-2xl font-bold text-black">Analytics</h1>|
        <Link
          to="/dashboard/overview"
          className="flex items-center gap-2 text-gray-500 text-sm ml-2"
        >
          <FaHouse className="text-gray-500" size={15} />
          Overview
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main side */}
        <div className="lg:col-span-3">
          {/* Quick Stats Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-5">
            {/* Practice Progress */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaSignal size={20} />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Practice Progress
                </h3>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">42</p>
                <p className="mt-1 text-sm text-gray-500">Completed Tests</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <FaChartLine size={16} className="mr-1" />
                  <span>+12 from last month</span>
                </div>
              </div>
            </div>

            {/* Avg. Time per Question */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaClock size={20} />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Avg. Time per Question
                </h3>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">32s</p>
                <p className="mt-1 text-sm text-gray-500">Per question</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <FaChartLine size={16} className="mr-1" />
                  <span>4s faster than avg.</span>
                </div>
              </div>
            </div>

            {/* Retake Improvement */}
            <div className="bg-white rounded-lg shadow p-6 flex-1">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaAward size={20} />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Retake Improvement
                </h3>
              </div>
              <div className="mt-6">
                <p className="text-3xl font-bold text-gray-900">+15%</p>
                <p className="mt-1 text-sm text-gray-500">Score improvement</p>
                <div className="mt-2 flex items-center text-sm text-green-600">
                  <FaChartLine size={16} className="mr-1" />
                  <span>3% better than last time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Test Scores Graph */}
          <TestScoreGraph />


          {/* Revenue Stat */}

          <RevenueStat />
        </div>

        {/* RIght side */}
        <div className="flex flex-col gap-4">
                    {/* Leaderboard Preview */}
          <Leaderboard />
           
          {/* Activity Streak */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaFire size={20} />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Activity Streak
                </h3>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <div className="text-5xl font-bold text-blue-600">7</div>
              <p className="mt-1 text-sm text-gray-500">consecutive days</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                3 more days to new record!
              </p>
            </div>
          </div>


          {/* Weakest Topics */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaTriangleExclamation size={20} />
                </div>
                <h3 className="ml-3 text-lg font-medium text-gray-900">
                  Weakest Topics
                </h3>
              </div>
            </div>
            <WeakTopics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
