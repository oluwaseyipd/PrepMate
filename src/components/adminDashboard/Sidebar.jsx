import React, { useEffect, useRef, useState } from 'react';
import { LogOut, Settings, BookOpen, Bookmark } from 'lucide-react';
import { FaGear, FaRightFromBracket, FaBookmark, FaBookOpen, FaChevronDown } from "react-icons/fa6";

import { Link } from 'react-router-dom';
import { navItems } from '../../constants/admin';
import logo from '../../assets/images/logo.png';

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const sidebarRef = useRef(null);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) && sidebarOpen) {
        toggleSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen, toggleSidebar]);

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <aside ref={sidebarRef} className="bg-white flex flex-col text-black w-64 p-4 md:block min-h-screen border-r border-gray-200">
      <div className="mb-8">
        <img src={logo} alt="" className="w-50" />
      </div>
      <nav>
        {navItems.map((item, index) => (
          item.name === "Courses" ? (
            <div key={index} className="mb-4">
              <button 
                className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded w-full text-left" 
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              >
                <item.icon size={20} />
                <span className="block cursor-pointer">Courses</span>
              </button>
              {isCoursesOpen && (
                <div className="ml-8">
                  <Link 
                    to="/dashboard/allCourses" 
                    className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded"
                    onClick={handleNavItemClick}
                  >
                    <FaBookOpen size={16} />
                    <span>All Courses</span>
                  </Link>
                  <Link 
                    to="/dashboard/mycourses" 
                    className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded"
                    onClick={handleNavItemClick}
                  >
                    <FaBookmark size={16} />
                    <span>My Courses</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link key={index} to={item.path} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded block" onClick={handleNavItemClick}>
              <item.icon size={20} />
              <span className="block">{item.name}</span>
            </Link>
          )
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
