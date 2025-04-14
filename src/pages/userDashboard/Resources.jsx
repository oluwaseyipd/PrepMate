import React from 'react'
import {Search } from "lucide-react";


const Resources = () => {
  return (
    <div className="p-4">
    <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
        <h1 className="text-3xl font-bold text-black">Resources</h1>
        {/* Search + Category on the right */}
  <div className="flex items-center gap-4 mt-5 md:mt-0">
    {/* Search Bar */}
    <div className="relative w-full sm:w-auto">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      placeholder="Search resources by name..."
      className="px-4 py-2 border text-black border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
    />
      
      </div>

    {/* Category Dropdown */}
    <select className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 focus:ring-0 w-full sm:w-auto">
      <option value="">All Categories</option>
      <option value="science">Science</option>
      <option value="math">Mathematics</option>
      <option value="history">History</option>
      <option value="tech">Technology</option>
    </select>
  </div>
  

      </div>
    </div>
  )
}

export default Resources