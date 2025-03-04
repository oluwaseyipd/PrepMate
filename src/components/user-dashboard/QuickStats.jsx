import React from "react";
import {stats} from "../../constants/user";
const QuickStats = () => {


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <div>{stat.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-700">{stat.value}</h3>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
