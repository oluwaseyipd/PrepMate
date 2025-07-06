import React, { useEffect, useRef, useState } from 'react';
import { FaGear, FaRightFromBracket, FaBookmark, FaBookOpen, FaChevronDown } from "react-icons/fa6";
import { Link, useLocation } from 'react-router-dom';
import { NAV_CONFIG } from '../../constants/navConfig';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';

const Sidebar = ({ toggleSidebar, sidebarOpen }) => {
  const sidebarRef = useRef(null);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { role } = useAuth();
  const location = useLocation();
  
  // Get navigation items based on user role
  const navItems = NAV_CONFIG[role] || [];
  
  // Debug: Log to see what's happening
  console.log('Current role:', role);
  console.log('Available roles in NAV_CONFIG:', Object.keys(NAV_CONFIG));
  console.log('Nav items for role:', navItems);

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

  // Auto-expand courses if we're on a course-related page
  useEffect(() => {
    if (location.pathname.includes('/dashboard/allcourses') || 
        location.pathname.includes('/dashboard/mycourses')) {
      setIsCoursesOpen(true);
    }
  }, [location.pathname]);

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  const isActiveLink = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getActiveLinkClasses = (path) => {
    return isActiveLink(path) 
      ? "flex items-center mb-4 gap-5 p-3 bg-blue-600 text-white transition-all duration-300 rounded block"
      : "flex items-center mb-4 gap-5 p-3 bg-white hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300 rounded block";
  };

  const getChildActiveLinkClasses = (path) => {
    return isActiveLink(path)
      ? "flex items-center gap-5 p-2 rounded bg-blue-600 text-white transition-all duration-300"
      : "flex items-center gap-5 p-2 rounded bg-white hover:bg-blue-600 text-gray-600 hover:text-white transition-all duration-300";
  };

  return (
    <aside ref={sidebarRef} className="bg-white flex flex-col text-gray-600 w-64 p-4 md:block h-screen border-r border-gray-200">
      <div className="mb-8">
        <img src={logo} alt="PrepMate Logo" className="w-50" />
      </div>
      
      <nav className="flex-grow overflow-y-auto mb-8">
        {/* Debug info */}
        {navItems.length === 0 && (
          <div className="text-red-500 p-4">
            <p>No navigation items found!</p>
            <p>Role: {role || 'undefined'}</p>
            <p>Available roles: {Object.keys(NAV_CONFIG).join(', ')}</p>
          </div>
        )}
        
        {navItems.map((item, index) => (
          item.children ? (
            // Handle nested navigation (like Courses)
            <div key={index} className="mb-2">
              <button 
                className={`flex items-center cursor-pointer p-3 hover:bg-blue-600 text-gray-600 hover:text-white rounded w-full text-left transition-all duration-300 ${
                  item.children.some(child => isActiveLink(child.path)) ? 'bg-blue-600 text-white' : ''
                }`}
                onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              >
                <div className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-5'>
                    <item.icon size={20} />
                    <span className="block cursor-pointer">{item.name}</span>
                  </div>
                  <FaChevronDown 
                    size={12} 
                    className={`transition-transform duration-200 ${isCoursesOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>
              {isCoursesOpen && (
                <div className="ml-8 mt-2">
                  {item.children.map((child, childIndex) => (
                    <Link 
                      key={childIndex}
                      to={child.path} 
                      className={getChildActiveLinkClasses(child.path)}
                      onClick={handleNavItemClick}
                    >
                      <child.icon size={16} />
                      <span>{child.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Handle regular navigation items
            <Link 
              key={index} 
              to={item.path} 
              className={getActiveLinkClasses(item.path)}
              onClick={handleNavItemClick}
            >
              <item.icon size={20} />
              <span className="block">{item.name}</span>
            </Link>
          )
        ))}
      </nav>

      {/* Settings and Logout at bottom */}
      <div className="border-t border-gray-200 pt-4">
        <Link 
          to="/dashboard/settings" 
          className={getActiveLinkClasses('/dashboard/settings')}
          onClick={handleNavItemClick}
        >
          <FaGear size={20} />
          <span className="block">Settings</span>
        </Link>
        
        <button 
          className="flex items-center gap-5 p-3 bg-white hover:bg-red-600 text-gray-600 hover:text-white transition-all duration-300 rounded w-full text-left"
          onClick={() => {
            // Add your logout logic here
            console.log('Logout clicked');
          }}
        >
          <FaRightFromBracket size={20} />
          <span className="block">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;