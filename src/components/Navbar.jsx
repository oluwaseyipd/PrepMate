import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "../assets/images/logo.png";
import { navItems } from "../constants";



const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toogleNavbar = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border border-gray-200 bg-white">
        <div className="container px-4 mx-auto relative text-sm">
            <div className="flex justify-between items-center align-center">
               <a href="index.jsx">
                <img className="w-40 md:w-56 mr-4" src={logo} alt="" />
               </a>

                <ul className="hidden md:flex justify-center items-center space-x-4">
                    {navItems.map((item, index) => (
                        <li key={index} className="text-lg text-gray-600 hover:text-black">
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>

                <div className="hidden lg:flex justify-center space-x-4 items-center">
                <a href="#" className="py-3 px-5 border rounded-3xl bg-transparent border-black text-black hover:bg-black hover:text-white"> 
                        Get Started
                    </a>
                    <a href="#" className="py-3 px-5 border rounded-3xl bg-black text-white hover:bg-white hover:text-black"> 
                        Get Started
                    </a>
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
                            <li key={index} className="py-4 text-lg text-gray-600 hover:text-black">
                                <a href={item.href}>{item.label}</a></li>
                     ))}
                    </ul>
                    
                    <div className="flex space-x-6 mt-8">
                        <a href="#" className="py-3 px-5 border rounded-3xl bg-transparent border-black text-black hover:bg-black hover:text-white"> 
                            Sign In
                        </a>
                        <a href="#" className="py-3 px-5 border rounded-3xl bg-black text-white hover:bg-white hover:text-black"> 
                            Get Started
                        </a>
                    </div>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar