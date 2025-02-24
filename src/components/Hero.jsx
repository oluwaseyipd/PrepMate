import React from 'react'
import banner from "../assets/images/hero-banner.png";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
    const location = useLocation();
  return (

<section className="w-full min-h-screen bg-gradient-to-l from-blue-50 to-white flex items-center">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 px-4">
    {/* Left Content */}
    <div className="max-w-xl space-y-6">
      <h1 className="text-6xl md:text-7xl font-bold leading-tight text-gray-900">
        Cabin In The Woods But In <br />
        <span className="text-blue-600 underline decoration-wavy">
          A Good Way!
        </span>
      </h1>
      <p className="mb-12 text-gray-500 max-w-[400px]">
        Now you can enjoy camping anywhere and anytime, and of course, it's safe
        with us.
      </p>
      <Link
        to="/register"
        className="py-5 px-10 border rounded-4xl bg-black text-white hover:bg-white hover:text-black transition duration-300"
      >
        Get Started
      </Link>
    </div>

    {/* Right Content (Phone Image) */}
    <div className="mt-15 md:mt-0 lg:block w-full md:w-1/2 h-full">
      <img
        src={banner}
        alt="Phone app mockup"
        className="w-full h-full object-contain drop-shadow-2xl"
      />
    </div>
  </div>
</section>


  )
}

export default Hero