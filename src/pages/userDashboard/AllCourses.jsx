import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { courses } from '../../constants/courses';

const AllCourses = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 16;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + coursesPerPage);

  const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="p-4">
      <h1 className="text-3xl text-black font-bold mb-4">All Courses</h1>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-4 my-2 gap-4">
        {courses.map((course) => (
          <div key={course.id} className="border rounded-t-lg p-3 shadow hover:shadow-md transition">
            <img src={course.image} alt={course.title} className="w-full h-42 object-cover rounded" />
            <h2 className="mt-2 font-semibold text-black text-xl">{course.title}</h2>
            <p className="text-sm text-gray-600 my-2"><span className='text-black'>Duration:</span> {course.duration}</p>
            <p className="text-sm text-gray-600 my-2">{course.description}</p>
            <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 cursor-pointer transition">
              Add Course
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
        <button onClick={handlePrevPage} disabled={currentPage === 1} className="p-2 disabled:opacity-50">
          <ArrowLeft size={20} />
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-500 rounded-full text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 rounded-full disabled:opacity-50">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default AllCourses;
