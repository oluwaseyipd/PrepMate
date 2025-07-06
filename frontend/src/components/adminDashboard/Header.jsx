import React, { useState, useEffect, useRef } from 'react';
import { Bell, Menu, Search, Settings, Key, LogOut, Bell as NotificationIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import user1 from '../../assets/images/user1.jpeg';

const Header = ({ toggleSidebar }) => {
  const [hasNotifications, setHasNotifications] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  
  // CSS for the shaking animation
  const bellShakeStyle = hasNotifications ? {
    animation: 'bellShake 0.5s cubic-bezier(.36,.07,.19,.97) both',
    animationIterationCount: '1',
    transform: 'translate3d(0, 0, 0)',
    backfaceVisibility: 'hidden',
    perspective: '1000px'
  } : {};

  // Add the animation keyframes to the document
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes bellShake {
        0% { transform: rotate(0); }
        15% { transform: rotate(5deg); }
        30% { transform: rotate(-5deg); }
        45% { transform: rotate(4deg); }
        60% { transform: rotate(-4deg); }
        75% { transform: rotate(2deg); }
        85% { transform: rotate(-2deg); }
        92% { transform: rotate(1deg); }
        100% { transform: rotate(0); }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    // For example:
    // localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Hamburger Icon for Mobile */}
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
        <div className="relative cursor-pointer">
          <Bell 
            size={24} 
            className="text-gray-700" 
            style={bellShakeStyle} 
          />
          {hasNotifications && (
            <span className="bg-red-500 w-2.5 h-2.5 rounded-full absolute -top-0.5 -right-0.5"></span>
          )}
        </div>

        {/* Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <img
              src={user1}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Profile Dropdown */}
          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-[1000] border border-gray-200 animate-fade-in-down">
              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img src={user1} alt="User" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">John Doe</p>
                    <p className="text-sm text-gray-500">john.doe@example.com</p>
                  </div>
                </div>
              </div>
              
              {/* Menu Items */}
              <div className="py-1">
                <Link 
                  to="/dashboard/settings" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <Settings size={16} className="mr-3" />
                  Account Settings
                </Link>
                
                <Link 
                   to="/dashboard/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <Key size={16} className="mr-3" />
                  Reset Password
                </Link>
                
                <Link 
                  to="/dashboard/settings?section=notification" 
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  onClick={() => setShowProfileDropdown(false)}
                >
                  <NotificationIcon size={16} className="mr-3" />
                  Notifications
                </Link>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-3" />
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;