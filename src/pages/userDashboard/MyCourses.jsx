import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import emptyImage from '../../assets/images/empty.png';
import { PlusCircle } from 'lucide-react';


const MyCourses = () => {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">My Courses</h1>
          <Link 
            to="/dashboard/allcourses" 
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <PlusCircle size={20} />
            <span>Add Course</span>
          </Link>
        </div>
  
        <div className="flex flex-col mt-24 md:mt-36 items-center justify-center h-96">
          <img src={emptyImage} alt="No Courses" className="w-60 md:w-90 mb-4" />
          <p className="text-gray-500">No courses added yet. Start by adding a new course!</p>
        </div>
      </div>
    );
  };
  
  export default MyCourses;