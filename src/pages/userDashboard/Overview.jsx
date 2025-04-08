import React from 'react';
import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {data} from '../../constants/user';
import overview from '../../assets/images/signin.png';
import "react-day-picker/dist/style.css";



const Overview = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2">


            <div className="flex bg-blue-500 text-white px-5 pt-2 rounded-lg items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-4xlfont-bold">Hello, Mohib!</h1>
                <p className=' mb-3 '>Let's learning something today</p>
                <p>Set your study plan and growth with community</p>
              </div>
              <div className='hidden md:flex'>
                <img src={overview} alt="Study Illustration" className="w-100" />
              </div>
            </div>



            <div className="bg-white shadow-sm rounded-lg p-4 border mt-10">
        <h3 className="text-lg font-semibold mb-4">Test Performance This Week</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#8884d8" />
            <YAxis />
            <Tooltip cursor={{ fill: "#f3f4f6" }} />
            <Bar dataKey="Tests" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-4 border">
        <DayPicker
          className="rounded-lg text-black"
          components={{
            IconLeft: ({ ...props }) => <ChevronLeft {...props} className="h-5 w-5 text-gray-700" />, 
            IconRight: ({ ...props }) => <ChevronRight {...props} className="h-5 w-5 text-gray-700" />, 
          }}
        />
      </div>
    </div>
  );
};

export default Overview;
