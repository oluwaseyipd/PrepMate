import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Search, ChevronDown, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import user1 from '../../assets/images/user1.jpeg';

const Header = ({ toggleSidebar }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const closeDropdown = () => setIsDropdownOpen(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between sticky top-0">
      {/* Hamburger Icon for Mobile */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Search Bar (Only on Desktop) */}
      <div className="hidden md:flex items-center w-full max-w-md bg-blue-50 rounded-full px-2 sticky top-0 z-50">
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

        {/* Avatar with Dropdown */}
        <div className='relative' ref={dropdownRef}>
          <div
            onClick={toggleDropdown}
            className='flex items-center gap-4 cursor-pointer border border-gray-200 rounded-full p-1 px-2'
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden border border-gray-200">
              <img
                src={user1}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <ChevronDown size={18} className="text-gray-700" />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='flex flex-col absolute gap-3 right-0 mt-2 w-80 bg-white shadow-lg rounded-lg z-50'>
              <div className='flex p-2 items-center gap-2 hover:bg-blue-100 text-black rounded-t border-b border-gray-200'>
                <div className="w-16 h-16 bg-gray-300 rounded-full overflow-hidden border border-gray-200">
                  <img
                    src={user1}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className='ml-2'>
                  <h3 className='text-lg font-semibold'>John Doe</h3>
                  <p className='text-sm text-gray-500'>johndoe@gmail.com</p>
                </div>
              </div>

              <div className='flex flex-col border-b border-gray-200'>
                <Link to="/dashboard/settings?section=account" onClick={closeDropdown} className="p-2 hover:bg-blue-100 text-gray-700 rounded-t">
                  Account Settings
                </Link>
                <Link to="/dashboard/settings?section=notification" onClick={closeDropdown} className="p-2 hover:bg-blue-100 text-gray-700">
                  Notification Settings
                </Link>
                <Link to="/dashboard/settings?section=privacy" onClick={closeDropdown} className="p-2 hover:bg-blue-100 text-gray-700 rounded-b">
                  Privacy Settings
                </Link>
              </div>

              <Link to="/signin" onClick={closeDropdown} className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded w-full text-left">
                <LogOut size={20} className='text-red-600' />
                <span className="block text-gray-700">Sign Out</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
