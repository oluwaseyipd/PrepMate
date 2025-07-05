import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { navItems } from "../constants";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toogleNavbar = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-gradient-to-l from-pink-50 to-blue-50" : "bg-transparent"
      }`}
    >
          {/* Blurry Gradient Blobs */}
      <div className="container px-4 mx-auto relative text-sm py-1">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img className="w-40 md:w-56" src={logo} alt="Logo" />
          </Link>

          <ul className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`text-lg text-gray-600 hover:text-blue-600 ${
                  location.pathname === item.href ? "active-navlink" : ""
                }`}
              >
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex space-x-4">
            <Link
              to="/signin"
              className="py-2 px-5 border rounded-3xl bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="py-2 px-5 rounded-3xl bg-blue-600 text-white hover:bg-blue-500 hover:text-white transition duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            >
              Get Started
            </Link>
          </div>

          <button onClick={toogleNavbar} className="lg:hidden text-blue-600">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="fixed right-0 z-20 bg-white shadow-lg w-full p-12 flex flex-col items-center lg:hidden">
                {/* Blurry Gradient Blobs */}
    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full filter blur-3xl opacity-30 z-0"></div>
  <div className="absolute bottom-[-80px] right-[50px] w-[800px] h-[400px]  bg-blue-300 rounded-full filter blur-3xl opacity-30 z-0"></div>
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="text-lg text-gray-600 hover:text-black mt-6">
                  <Link to={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6 mt-8">
              <Link to="/signin" className="py-3 px-5 border rounded-3xl border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                Sign In
              </Link>
              <Link to="/register" className="py-3 px-5 rounded-3xl bg-blue-600 text-white hover:bg-blue-500 hover:text-white transition duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
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
