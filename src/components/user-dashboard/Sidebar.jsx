import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { navItems } from "../../constants";
import Tooltip from "./Tooltip";
import { Bell, UserCircle } from "lucide-react";
import logo from "../../assets/images/logo-w.png";
import logoIcon from "../../assets/images/logo-icon.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`h-screen ${isOpen ? "w-64" : "w-20"} bg-blue-900 text-white shadow-lg fixed transition-all duration-300 z-50 ${isMobile && isOpen ? "absolute" : ""}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6">
            {isOpen ? <img className="w-40" src={logo} alt="Logo" /> : <img className="w-10" src={logoIcon} alt="Logo Icon" />}
            <button onClick={toggleSidebar} className="focus:outline-none">
              {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
            </button>
          </div>

          <nav className="mt-10 flex-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className={`flex items-center gap-3 p-4 hover:bg-blue-700 transition-all ${!isOpen && "justify-center"} ${window.location.hash === `#${item.link}` ? "bg-blue-700 border-l-4 border-white" : ""}`}
              >
                {item.icon}
                {isOpen ? <span>{item.name}</span> : <Tooltip text={item.name} />}
              </Link>
            ))}
          </nav>

          <div className="p-4">
            <Link to="/signin" className="flex items-center gap-3 p-4 hover:bg-red-600 transition-all">
              <LogOut className="h-6 w-6" />
              {isOpen ? <span>Logout</span> : <Tooltip text="Logout" />}
            </Link>
          </div>
        </div>
      </div>

      <div className={`flex-1 transition-all duration-300 ${isOpen ? "ml-64" : "ml-20"} overflow-auto`}> 
        <header className="bg-white shadow-md w-full px-6 py-4 flex justify-between items-center border-b">
        <div className="flex flex-col items-left">
            <p className="text-xl font-bold text-blue-600 mb-2">Hi John Oluwaseyi</p>
            <h3 className="text-3xl font-bold text-black">Welcome back!</h3>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative">
              <Bell className="w-7 h-7 text-gray-600" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </button>
            <div className="relative">
              <UserCircle className="w-10 h-10 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Sidebar;
