import React, { useState } from 'react';
import Sidebar from '../components/userDashboard/Sidebar';
import Header from '../components/userDashboard/Header';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-50`}>
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-3 md:p-6 overflow-y-auto h-full">
          <Outlet /> {/* This is where all your pages will show automatically */}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
