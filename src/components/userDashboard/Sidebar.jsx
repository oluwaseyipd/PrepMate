import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import {navItems} from '../../constants/user';
import logo from '../../assets/images/logo.png';


const Sidebar = ({ toggleSidebar }) => {

    return (
        <aside className="bg-white flex flex-col justify-between text-black w-64 p-4 md:block min-h-screen border-r border-gray-200">
          <div className="mb-8">
            <img src={logo} alt="" className="w-50" />
          </div>
          <nav>
        {navItems.map((item, index) => (
          <Link key={index} to={item.path} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded block">
            <item.icon size={20} />
            <span className="hidden lg:block">{item.name}</span>
          </Link>
        ))}
        <div className="mt-8">
          <Link to="/dashboard/settings" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded block">
            <Settings size={20} />
            <span className="hidden lg:block">Settings</span>
          </Link>
          <Link to="/signin" className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded w-full text-left">
            <LogOut size={20} />
            <span className="hidden lg:block">Sign Out</span>
          </Link>
        </div>
      </nav>
        </aside>
  );
};

export default Sidebar;
