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
    <div className="flex h-screen bg-blue-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:block z-50`}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="p-6">
          <Outlet /> {/* This is where all your pages will show automatically */}
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
