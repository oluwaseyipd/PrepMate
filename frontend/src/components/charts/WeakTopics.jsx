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

const weakTopicsData = [
  { name: "Geometry", score: 65 },
  { name: "Physics", score: 70 },
  { name: "Algebra", score: 75 }
];

const WeakTopics = () => {
  return (
    <div>
      <div className="mt-4">
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weakTopicsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis dataKey="name" type="category" width={80} axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Score']}
                          contentStyle={{ 
                            backgroundColor: "#fff", 
                            border: "1px solid #e5e7eb", 
                            borderRadius: "0.375rem" 
                          }}
                        />
                        <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={10} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  </div>
    </div>
  )
}

export default WeakTopics
