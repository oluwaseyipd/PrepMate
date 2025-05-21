import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

// Sample data for charts
const testScoreData = [
  { month: "Jan", score: 78 },
  { month: "Feb", score: 82 },
  { month: "Mar", score: 79 },
  { month: "Apr", score: 85 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 }
];

const TestScoreGraph = () => {
  return (
    <div>
 <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-medium cursor-pointer text-gray-900">Test Scores Over Time</h2>
                  <div className="flex items-center space-x-2">
                    <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-1">
                      <option value="all">All Months</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                    </select>
                    <select className="bg-white border cursor-pointer border-gray-300 text-gray-700 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 px-2 py-1">
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>
                <div className="h-100">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={testScoreData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" domain={[50, 100]} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#fff", 
                          border: "1px solid #e5e7eb", 
                          borderRadius: "0.375rem" 
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "#fff" }} 
                        activeDot={{ r: 6, fill: "#3b82f6" }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
                </div>

  );
};

export default TestScoreGraph
