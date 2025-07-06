import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  Search,
  Bell,
  Settings,
  Key,
  LogOut,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import defaultAvatar from '../../assets/images/user1.jpeg';

const Header = ({ toggleSidebar }) => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [hasNotifications] = useState(true); // demo – wire to real data later

  //------------------------------------------------------
  // bell shake keyframes (copied from user header)
  //------------------------------------------------------
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
    return () => document.head.removeChild(style);
  }, []);

  const bellStyle = hasNotifications
    ? {
        animation: 'bellShake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      }
    : {};

  //------------------------------------------------------
  // close dropdown on outside click
  //------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => navigate('/signin');

  //------------------------------------------------------
  // role‑specific dropdown menu items - UPDATED PATHS
  //------------------------------------------------------
  const MENU_ITEMS = {
    user: [
      { label: 'Account Settings', path: '/dashboard/settings', icon: Settings },
      { label: 'Reset Password', path: '/dashboard/settings?section=password', icon: Key },
      { label: 'Notifications', path: '/dashboard/settings?section=notification', icon: Bell },
    ],
    admin: [
      { label: 'Account Settings', path: '/admin/settings', icon: Settings },
      { label: 'Notification Settings', path: '/admin/settings?section=notification', icon: Bell },
    ],
    superadmin: [
      { label: 'Account Settings', path: '/superadmin/settings', icon: Settings },
      { label: 'Admin Management', path: '/superadmin/admins', icon: Users },
      { label: 'System Settings', path: '/superadmin/settings/system', icon: Settings },
      { label: 'Audit Logs', path: '/superadmin/audit-logs', icon: ShieldCheck },
    ],
  };

  const dropdownItems = MENU_ITEMS[role] || [];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-50">
      {/* Mobile hamburger */}
      <button className="md:hidden" onClick={toggleSidebar}>
        <Menu size={24} className="text-gray-700" />
      </button>

      {/* Search – desktop only */}
      <div className="hidden md:flex items-center w-full max-w-md bg-blue-50 rounded-full px-2">
        <Search size={20} className="text-gray-700 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-blue-50 text-black rounded-full p-2 outline-none"
        />
      </div>

      {/* right controls */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <Bell size={24} className="text-gray-700" style={bellStyle} />
          {hasNotifications && (
            <span className="bg-red-500 w-2.5 h-2.5 rounded-full absolute -top-0.5 -right-0.5"></span>
          )}
        </div>

        {/* avatar + dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden border-2 border-blue-500 cursor-pointer"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            <img src={defaultAvatar} alt="avatar" className="w-full h-full object-cover" />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 border border-gray-200 animate-fade-in-down z-[1000]">
              {/* user‑info (static demo – wire real data) */}
              <div className="px-4 py-3 border-b border-gray-100 flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                  <img src={defaultAvatar} alt="user" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">John Doe</p>
                  <p className="text-sm text-gray-500">john.doe@example.com</p>
                </div>
              </div>

              {/* dynamic menu */}
              <div className="py-1">
                {dropdownItems.map(({ label, path, icon: Icon }) => (
                  <Link
                    key={label}
                    to={path}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                  >
                    <Icon size={16} className="mr-3" />
                    {label}
                  </Link>
                ))}

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