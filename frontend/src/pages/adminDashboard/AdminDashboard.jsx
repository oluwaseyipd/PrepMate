import React from "react";
import { Clock } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { overview, activities } from "../../constants/user";
import {
  PieChart,
  BarChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {

    // Function to calculate time ago
    const timeAgo = (timestamp) => {
      const now = new Date();
      const diffInMs = now - timestamp;
      const seconds = Math.floor(diffInMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
  
      if (seconds < 60) return `${seconds} seconds ago`;
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      if (days < 30) return `${days} days ago`;
      return `${months} months ago`;
    };

    
  return (
    <div>
      {/* Quick Stat */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10">
        <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
          <Clock className="text-pink-500 text-xl bg-pink-300 p-3 h-12 w-12 rounded-full" />
          <h2 className="mt-3 text-xl text-black">Total Tests Taken</h2>
        </div>
        <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
          <Clock className="text-blue-500 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
          <h2 className="mt-3 text-xl text-black">Average Score</h2>
        </div>
        <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
          <Clock className="text-green-500 text-xl bg-green-300 p-3 h-12 w-12 rounded-full" />
          <h2 className="mt-3 text-xl text-black">Best Performance</h2>
        </div>
        <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
          <Clock className="text-yellow-500 text-xl bg-yellow-300 p-3 h-12 w-12 rounded-full" />
          <h2 className="mt-3 text-xl text-black">Courses Enrolled</h2>
        </div>
      </div>

      {/* Statistics and Calendar*/}
      <div className="flex flex-col md:flex-row gap-10 mt-10">
    {/* Barchart */}
        <div className="bg-white shadow-sm rounded-lg p-4 border mt-10 w-full md:w-2/3">
          <h3 className="text-lg text-black font-semibold pb-4 border-b border-gray-300">
            Test Performance
          </h3>
          <div className="mt-5">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={overview}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

                      {/* Calendar */}
                      <div className="bg-white w-full md:w-1/3 shadow-sm rounded-lg p-4 border flex justify-center">
          <DayPicker
      className="rounded-lg text-black"
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft {...props} className="h-5 w-5 text-gray-700 cursor-pointer" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight {...props} className="h-5 w-5 text-gray-700 cursor-pointer" />
        ),
      }}
      modifiersClassNames={{
        today: 'bg-blue-600 text-white rounded-full',
      }}
    />
          </div>
      </div>
      {/* Create and Notification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Create */}
        <div className="grid grid-cols-2 gap-10 mt-10">
 <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
            <Clock className="text-pink-500 text-xl bg-pink-300 p-3 h-12 w-12 rounded-full" />
            <h2 className="mt-3 text-xl text-black">Total Tests Taken</h2>
          </div>
          <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
            <Clock className="text-blue-500 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
            <h2 className="mt-3 text-xl text-black">Average Score</h2>
          </div>
          <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
            <Clock className="text-green-500 text-xl bg-green-300 p-3 h-12 w-12 rounded-full" />
            <h2 className="mt-3 text-xl text-black">Best Performance</h2>
          </div>
          <div className="p-5 flex flex-col bg-white justify-center items-center rounded-lg">
            <Clock className="text-yellow-500 text-xl bg-yellow-300 p-3 h-12 w-12 rounded-full" />
            <h2 className="mt-3 text-xl text-black">Courses Enrolled</h2>
          </div>
        </div>

      {/* Notifications */}
        <div className="bg-white shadow-sm rounded-lg p-4 border">
          <h3 className="text-xl text-black font-semibold mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            {/* Notification Item 1 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">New Course Available</p>
              <p className="text-sm text-gray-600">
                A new course on Web Development has been added. Check it out!
              </p>
              <span className="text-xs text-gray-400">Just Now</span>
            </div>

            {/* Notification Item 2 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Test Results Updated</p>
              <p className="text-sm text-gray-600">
                Your test results for the JavaScript Basics exam have been
                updated. View them now.
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>

            {/* Notification Item 3 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Upcoming Webinar</p>
              <p className="text-sm text-gray-600">
                Join us for an exclusive webinar on Python programming next
                Monday at 6 PM.
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities and Notification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
        {/* Recent Activites */}
                <div className="bg-white shadow-sm rounded-lg p-4 border">
                  <h3 className="text-xl text-black font-semibold mb-4">
                    Recent Activities
                  </h3>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                      >
                        <p className="font-medium text-gray-800">{activity.action}</p>
                        <span className="text-sm text-gray-600">
                          {timeAgo(activity.timestamp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

         {/* Notifications */}
         <div className="bg-white shadow-sm rounded-lg p-4 border">
          <h3 className="text-xl text-black font-semibold mb-4">
            Notifications
          </h3>
          <div className="space-y-4">
            {/* Notification Item 1 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">New Course Available</p>
              <p className="text-sm text-gray-600">
                A new course on Web Development has been added. Check it out!
              </p>
              <span className="text-xs text-gray-400">Just Now</span>
            </div>

            {/* Notification Item 2 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Test Results Updated</p>
              <p className="text-sm text-gray-600">
                Your test results for the JavaScript Basics exam have been
                updated. View them now.
              </p>
              <span className="text-xs text-gray-400">2 hours ago</span>
            </div>

            {/* Notification Item 3 */}
            <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
              <p className="font-medium text-gray-800">Upcoming Webinar</p>
              <p className="text-sm text-gray-600">
                Join us for an exclusive webinar on Python programming next
                Monday at 6 PM.
              </p>
              <span className="text-xs text-gray-400">1 day ago</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
