import React from "react";
import { ArrowDown, Calendar } from "lucide-react";
import RevenueStat from "../../components/charts/RevenueStat";
import StudyStat from "../../components/charts/StudyStat";

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
      {/* Main side */}
      <div className="lg:col-span-3">
        {/* Quick Stat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Time Spent */}
          <div className="flex flex-col bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-start items-center gap-4 mb-5">
              <div className="flex justify-between items-center bg-green-500 text-white p-3 rounded-full">
                <Calendar className="text-white" size={30} />
              </div>
              <span className="text-black text-xl">Time Spent</span>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <span className="text-black text-2xl">10:30:00</span>
              <span className="flex items-center gap-2">
                <ArrowDown className="text-red-500" size={20} />
                <span className="text-red-500">+ 2:00:00</span>
              </span>
            </div>
          </div>

          {/* Test COmpleted */}
          <div className="flex flex-col bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-start items-center gap-4 mb-5">
              <div className="flex justify-between items-center bg-purple-500 text-white p-3 rounded-full">
                <Calendar className="text-white" size={30} />
              </div>
              <span className="text-black text-xl">Time Spent</span>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <span className="text-black text-2xl">10:30:00</span>
              <span className="flex items-center gap-2">
                <ArrowDown className="text-red-500" size={20} />
                <span className="text-red-500">+ 2:00:00</span>
              </span>
            </div>
          </div>
          {/* Time Spent */}
          <div className="flex flex-col bg-white p-5 rounded-lg shadow-md">
            <div className="flex justify-start items-center gap-4 mb-5">
              <div className="flex justify-between items-center bg-orange-500 text-white p-3 rounded-full">
                <Calendar className="text-white" size={30} />
              </div>
              <span className="text-black text-xl">Time Spent</span>
            </div>

            <div className="flex flex-col gap-2 mt-5">
              <span className="text-black text-2xl">10:30:00</span>
              <span className="flex items-center gap-2">
                <ArrowDown className="text-red-500" size={20} />
                <span className="text-red-500">+ 2:00:00</span>
              </span>
            </div>
          </div>
        </div>

        {/* Study Stat */}
        <StudyStat />
        
        {/* Revenue Stat */}

        <RevenueStat />
      </div>

      {/* RIght side */}
      <div className="flex flex-col gap-4">
        {/* HOur Spent */}
        <div className="flex flex-col bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-start items-center gap-4 mb-5">
            <div className="flex justify-between items-center bg-orange-500 text-white p-3 rounded-full">
              <Calendar className="text-white" size={30} />
            </div>
            <span className="text-black text-xl">Time Spent</span>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <span className="text-black text-2xl">10:30:00</span>
            <span className="flex items-center gap-2">
              <ArrowDown className="text-red-500" size={20} />
              <span className="text-red-500">+ 2:00:00</span>
            </span>
          </div>
        </div>

        {/*  */}
        <div className="flex flex-col bg-white p-5 rounded-lg shadow-md">
          <div className="flex justify-start items-center gap-4 mb-5">
            <div className="flex justify-between items-center bg-orange-500 text-white p-3 rounded-full">
              <Calendar className="text-white" size={30} />
            </div>
            <span className="text-black text-xl">Time Spent</span>
          </div>

          <div className="flex flex-col gap-2 mt-5">
            <span className="text-black text-2xl">10:30:00</span>
            <span className="flex items-center gap-2">
              <ArrowDown className="text-red-500" size={20} />
              <span className="text-red-500">+ 2:00:00</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
