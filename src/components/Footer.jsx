import React from "react";
import { navigation, communityLinks, socialLinks } from "../constants";
import logo from "../assets/images/logo-w.png";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-12 mt-6 md:mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        {/* Logo and Description */}
        <div className="space-y-4">
          <img src={logo} alt="Campty Logo" className="w-56" />
          <p className="text-gray-300 text-xl w-[350px]">
            We always make our customer happy by providing as many choices as possible.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-36">
          {/* Navigation Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.map((link, i) => (
                <li key={i} className="text-gray-300 hover:text-white transition cursor-pointer">
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              {communityLinks.map((link, i) => (
                <li key={i} className="text-gray-300 hover:text-white transition cursor-pointer">
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover:text-white transition cursor-pointer">
                Campty@gmail.com
              </li>
            </ul>
            {/* Social Media */}
            <div className="flex space-x-4 mt-4">
  {socialLinks.map((link, i) => (
    <a
      key={i}
      href={link.href}
      className="bg-white h-12 w-12 p-2 rounded-full hover:opacity-80 transition"
    >
      <img src={link.icon} alt={link.alt} className="w-10" />
    </a>
  ))}
</div>

          </div>
        </div>
      </div>
      <div className="container mx-auto h-2 mt-6 border-b border-blue-400"></div>
      <div className="mt-8 text-center text-gray-300">
        Copyright © 2025 PrepMate. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
