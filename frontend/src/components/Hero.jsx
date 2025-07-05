import React from 'react'
import banner from "../assets/images/hero-banner.png";
import avater from "../assets/images/home-avater.jpg";
import { Link, useLocation } from "react-router-dom";

const Hero = () => {
    const location = useLocation();
  return (

<section className="relative w-full h-screen overflow-hidden bg-blue-50 flex items-center justify-center pt-24">

    {/* Blurry Gradient Blobs */}
    <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-300 rounded-full filter blur-3xl opacity-30 z-0"></div>
  <div className="absolute bottom-[-80px] right-[200px] w-[800px] h-[400px]  bg-blue-300 rounded-full filter blur-3xl opacity-30 z-0"></div>
  <div className="absolute bottom-[-40px] left-[150px] w-[800px] h-[600px]  bg-pink-300 rounded-full filter blur-3xl opacity-30 z-0"></div>
  <div className="absolute top-[150px] right-[150px] w-[250px] h-[250px] bg-purple-300 rounded-full filter blur-3xl opacity-30 z-0"></div>


  <div className="container mx-auto flex flex-col items-center justify-between gap-8">
    {/* Left Content */}
    <div className="space-y-6 text-center  w-[100%] md:w-[600px] px-2 md:px-0">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
        Empowering Students For Academic Success
        {/* <span className="text-blue-600 underline decoration-wavy">Academic Success</span> */}
      </h1>
      <p className="mb-12 text-gray-500">
      PrepMate provides practice tests, real-time feedback, and progress tracking to help you prepare smarter and succeed with confidence.
      </p>
      <Link
        to="/register"
        className="py-4 px-10 rounded-4xl bg-blue-600 text-white hover:bg-blue-500 hover:text-white transition duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
      >
        Get Started
      </Link>
    </div>

    {/* Right Content (Phone Image) */}
    <div className="mt-15 md:mt-0 lg:block w-full md:w-1/2 h-full">
      <img
        src={banner}
        alt="Phone app mockup"
        className="w-100% md:w-[80%] object-contain drop-shadow-2xl"
      />
    </div>
  </div>


  <div className="hidden absolute md:flex justify-between align-middle bottom-100 md:bottom-100 left-10 md:left-110 rounded-2xl border-2 border-white shadow-lg bg-transparent py-2 px-3 md:px-5 md:py-2">
  <div className='w-10 h-10 rounded-full overflow-hidden'>
    <img src={avater} alt="Avatar" className="w-full h-full object-cover" />
  </div>
  <div className='flex flex-col justify-start ml-5 text-sm md:text-xl'>
    <p className='text-black'>Student's Success</p>
    <p className='font-bold text-black'>15.9%</p>
  </div>
  
</div>

      <p className='hidden md:flex absolute bottom-80 right-130 rounded-2xl border-2 border-white shadow-lg bg-transparent p-2 md:p-5 text-black'>We prepare students for success.</p>

    {/* Our users */}
    <div className='hidden absolute md:flex flex-col justify-start bottom-0 right-0 bg-transparent p-5 w-80 text-black '>
    <div className='flex  justify-start'>
    <div className='w-15 h-15 rounded-full overflow-hidden border-2 border-white shadow-lg'>
        <img src={avater} alt="w-full h-full object-cover" />
      </div>
      <div className='w-15 h-15 rounded-full overflow-hidden border-2 border-white shadow-lg relative -left-[10px]'>
        <img src={avater} alt="w-full h-full object-cover" />
      </div>
      <div className='w-15 h-15 rounded-full overflow-hidden border-2 border-white shadow-lg relative -left-[20px]'>
        <img src={avater} alt="w-full h-full object-cover" />
      </div>
      </div>
      <p className='text-lg font-medium mt-2'>We work towards <span className='text-pink-500'>ensuring a life</span> full of success.</p>
    </div>
</section>


  )
}

export default Hero