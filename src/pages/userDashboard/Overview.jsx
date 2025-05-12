import React from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import { data, overview, recentTest, activities } from "../../constants/user";
import Calendar from "../../components/Calendar";
import StudyStat from "../../components/charts/StudyStat";
import welcomeAvatar from "../../assets/images/signin.png";
import "react-day-picker/dist/style.css";
import { Hourglass, Book, Award, BarChart } from "lucide-react";

const Overview = () => {

    useEffect(() => {
      AOS.init({
        duration: 1000, // Optional: animation duration in ms
        once: true,     // Optional: whether animation should happen only once
      });
    }, []);

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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      <div className="lg:col-span-2">
        <div className="flex bg-blue-500 text-white px-5 pt-2 rounded-lg items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-4xl">
              Welcome back, John 👋{" "}
            </h1>
            <p className=" mb-3 ">Ready to ace your next test?</p>
            <p>Set your study plan and growth with community</p>
          </div>
          <div className="hidden md:flex">
            <img
              src={welcomeAvatar}
              alt="Study Illustration"
              className="w-100"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10">
     <div 
  className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm"
  data-aos="fade-up" 
  data-aos-delay="200"
>
  <div className="flex items-center justify-center h-14 w-14 bg-pink-100 rounded-full">
    <Hourglass className="text-pink-600 text-2xl" />
  </div>
  <div className="flex flex-col">
    <h2 className="text-3xl font-semibold text-gray-900">21</h2>
    <p className="text-gray-500">Total Tests Taken</p>
  </div>
</div>

        <div 
  className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm"
  data-aos="fade-up" 
  data-aos-delay="200"
>
  <div className="flex items-center justify-center h-14 w-14 bg-blue-100 rounded-full">
    <BarChart className="text-blue-600 text-2xl" />
  </div>
  <div className="flex flex-col">
    <h2 className="text-3xl font-semibold text-gray-900">345</h2>
    <p className="text-gray-500">Average Score</p>
  </div>
</div>

          <div 
  className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm"
  data-aos="fade-up" 
  data-aos-delay="200"
>
  <div className="flex items-center justify-center h-14 w-14 bg-green-100 rounded-full">
    <Award className="text-green-600 text-2xl" />
  </div>
  <div className="flex flex-col">
    <h2 className="text-3xl font-semibold text-gray-900">90</h2>
    <p className="text-gray-500">Best Perfomance</p>
  </div>
</div>

     <div 
  className="flex items-center justify-between gap-4 p-4 bg-white rounded-xl shadow-sm"
  data-aos="fade-up" 
  data-aos-delay="200"
>
  <div className="flex items-center justify-center h-14 w-14 bg-yellow-100 rounded-full">
    <Book className="text-yellow-600 text-2xl" />
  </div>
  <div className="flex flex-col">
    <h2 className="text-3xl font-semibold text-gray-900">21</h2>
    <p className="text-gray-500">Course Enrolled</p>
  </div>
</div>

        </div>

        {/* Statistics */}
        <div data-aos="fade-up">
 <StudyStat />
        </div>
         


        {/* Recent Activities */}
        <div className="bg-white shadow-sm rounded-lg p-4 border mt-10" >
          <h3 className="text-lg text-black font-semibold pb-4 border-b border-gray-300">
            Recent Activities
          </h3>
          <div className="overflow-x-auto w-full">
          <table className="min-w-full text-sm text-left text-gray-700 mt-5">
            <thead className="text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="py-3 px-4 whitespace-nowrap text-black">Course Title</th>
                <th className="py-3 px-4 whitespace-nowrap text-black">Date</th>
                <th className="py-3 px-4 whitespace-nowrap text-black">Duration</th>
                <th className="py-3 px-4 whitespace-nowrap text-black">Score</th>
                <th className="py-3 px-4 whitespace-nowrap text-black">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTest.map((activity, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 whitespace-nowrap">{activity.title}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{activity.date}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{activity.duration}</td>
                  <td className="py-3 px-4 whitespace-nowrap">{activity.score}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        {/* Calendar */}
              <div data-aos="fade-left">
                 <Calendar />
              </div>
       

        {/* Admin Notification */}
        <div className="bg-white shadow-sm rounded-lg p-4 border" data-aos="fade-up">
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

        {/* Recent Activities */}
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
      </div>
    </div>
  );
};

export default Overview;
