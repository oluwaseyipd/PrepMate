// layouts/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSidebar from '../components/userDashboard/Sidebar';
import UserHeader from '../components/userDashboard/Header';
import AdminSidebar from '../components/adminDashboard/Sidebar';
import AdminHeader from '../components/adminDashboard/Header';

const DashboardLayout = () => {
  const role = localStorage.getItem('role'); // or useAuth() / context

  const renderHeader = () => {
    if (role === 'admin' || role === 'superadmin') return <AdminHeader />;
    return <UserHeader />;
  };

  const renderSidebar = () => {
    if (role === 'admin' || role === 'superadmin') return <AdminSidebar />;
    return <UserSidebar />;
  };

  return (
    <div className="relative flex h-screen bg-blue-50">
      <div className="z-50">{renderSidebar()}</div>

      <div className="flex-1 flex flex-col">
        {renderHeader()}
        <main className="p-3 md:p-6 overflow-y-auto h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
