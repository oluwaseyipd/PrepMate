import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import { navItems } from "../constants";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toogleNavbar = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg  bg-white">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center align-center">
          <Link to="/">
            <img className="w-40 md:w-56 mr-4" src={logo} alt="Logo" />
          </Link>

          <ul className="hidden md:flex justify-center items-center space-x-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`text-lg text-gray-600 hover:text-black ${
                  location.pathname === item.href ? "active-navlink" : ""
                }`}
              >
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex justify-center space-x-4 items-center">
            <Link
              to="/signin"
              className="py-3 px-5 border rounded-3xl bg-transparent border-black text-black hover:bg-black hover:text-white"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="py-3 px-5 border rounded-3xl bg-black text-white hover:bg-white hover:text-black"
            >
              Get Started
            </Link>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toogleNavbar} className="text-2xl text-black">
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="fixed right-0 z-20 bg-white shadow-lg w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li
                  key={index}
                  className="text-lg text-gray-600 hover:text-black mt-6"
                >
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6 mt-8">
              <Link
                to="/signin"
                className="py-3 px-5 border rounded-3xl bg-transparent border-black text-black hover:bg-black hover:text-white"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="py-3 px-5 border rounded-3xl bg-black text-white hover:bg-white hover:text-black"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
