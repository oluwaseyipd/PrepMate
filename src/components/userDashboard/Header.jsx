import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import user1 from '../../assets/images/user1.jpeg';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
      {/* Harmburger Icon for Mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Search Bar (Only on Desktop) */}
      <div className="hidden md:flex items-center w-full max-w-md bg-blue-50 rounded-full p-2 sticky top-0 z-50">
      <Search size={20} className="text-gray-700 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-blue-50 text-black rounded-full p-2 outline-none"
        />
      </div>

      {/* Notification + User Avatar */}
     
      <div className="flex items-center gap-6">
      <Link to="/dashboard/settings?section=notification">
      <div className="relative cursor-pointer">
          <Bell size={24} className="text-gray-700" />
          <span className="bg-red-500 text-white text-xs rounded-full px-2 absolute -top-1 -right-2">
            3
          </span>
        </div>
        </Link>

        {/* Avatar */}
        <Link to="/dashboard/settings">
          <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer">
            <img
              src={user1}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
