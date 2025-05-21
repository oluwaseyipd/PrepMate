import React, { useEffect, useRef, useState } from 'react';
import { FaGear, FaRightFromBracket, FaBookmark, FaBookOpen, FaChevronDown } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { navItems } from '../../constants/user';
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
    <aside ref={sidebarRef} className="bg-white flex flex-col text-gray-600 w-64 p-4 md:block h-screen border-r border-gray-200">
      <div className="mb-8">
        <img src={logo} alt="" className="w-50" />
      </div>
      
      <nav className="flex-grow overflow-y-auto mb-8">
        {navItems.map((item, index) => (
          item.name === "Courses" ? (
            <div key={index} className="mb-2">
              <button 
                className="flex items-center cursor-pointer p-3 hover:bg-blue-600 text-gray-600 hover:text-white rounded w-full text-left transition-all duration-300" 
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-5'>
                      <item.icon size={20} />
                <span className="block cursor-pointer">Courses</span>
                  </div>

                <FaChevronDown   size={12} />
                </div>
              
              </button>
              {isCoursesOpen && (
                <div className="ml-8">
                  <Link 
                    to="/dashboard/allCourses" 
                    className="flex items-center gap-5 p-2 rounded bg-white  hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300"
                    onClick={handleNavItemClick}
                  >
                    <FaBookOpen size={16} />
                    <span>All Courses</span>
                  </Link>
                  <Link 
                    to="/dashboard/mycourses" 
                    className="flex items-center gap-5 p-2 rounded bg-white  hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300"
                    onClick={handleNavItemClick}
                  >
                    <FaBookmark  size={16} />
                    <span>My Courses</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link key={index} to={item.path} className="flex items-center mb-4 gap-5 p-3 bg-white  hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 rounded block" onClick={handleNavItemClick}>
              <item.icon size={20} />
              <span className="block">{item.name}</span>
            </Link>
          )
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-200 pt-4">
        <Link to="/dashboard/settings" className="flex items-center gap-3 p-3 bg-white hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 rounded block mb-2" onClick={handleNavItemClick}>
          <FaGear size={20} />
          <span className="block">Settings</span>
        </Link>
        <Link to="/signin" className="flex items-center gap-3 p-3 bg-white hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 rounded w-full text-left" onClick={handleNavItemClick}>
          <FaRightFromBracket size={20} />
          <span className="block">Sign Out</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;