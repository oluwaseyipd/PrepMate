import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ArrowLeft, ArrowRight, Bookmark, BookIcon, Clock, Star, Search } from 'lucide-react';
import { courses, categoryStyles } from '../../constants/admincources';

const ManageTests = () => {

    const [currentPage, setCurrentPage] = useState(1);
      const [searchQuery, setSearchQuery] = useState("");
    const coursesPerPage = 8;
    const totalPages = Math.ceil(courses.length / coursesPerPage);
  
    const startIndex = (currentPage - 1) * coursesPerPage;
    const currentCourses = courses.slice(startIndex, startIndex + coursesPerPage);
  
    const handleNextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const handlePrevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    
    // Course Category Title Case formartting 
    const toTitleCase = (str) => {
      return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      );
    };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-black mb-5">Manage Tests</h1>
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div className="flex items-center relative w-full sm:w-auto bg-blue-50 border border-gray-300 rounded-full p-2 mb-3 md:mb-0">
            <Search size={18} className="mr-2 text-gray-500" />
            <input
              type="text"
              value=""
              onChange=""
              placeholder="Search resources by name..."
              className="w-full bg-blue-50 text-black mr-2 outline-none sm:w-auto"
            />
          </div>
              <Link
                to="/admin/createtest"
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <PlusCircle size={20} />
                <span>Create New Test</span>
              </Link>
              </div>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 my-2 gap-4">
          {currentCourses.map((course) => (
    
              <div key={course.id} className="flex flex-col bg-white border rounded-xl p-3 mt-5 md:mt-0 shadow transition">
    
                <img src={course.image} alt={course.title} className="w-full h-42 object-cover rounded" />
                <div className='mt-3'>
                {(() => {
      const category = toTitleCase(course.category);
      const styles = categoryStyles[category] || categoryStyles.default;
      return (
        <span className={`py-1 px-4 rounded-full text-sm ${styles.bg} ${styles.text}`}>
          {category}
        </span>
      );
    })()}
    
    
                <h2 className="my-3 font-semibold text-black text-xl">{course.title}</h2>
                <div className="flex items-center gap-2">
                  <img src={course.authorImage} alt={course.author} className="w-8 h-8 rounded-full" />
                  <p className="text-sm text-gray-600">Created by <span className='text-black font-bold'>{course.author}</span></p>
                  </div>
                </div>
                <hr className='mt-3 border border-blue-100'/>
                <div className='flex justify-start items-center gap-3 mt-3'>
                  <span className='text-sm text-gray-600 flex items-center gap-1'>
                  <BookIcon className='text-blue-500' size={15} /> {course.totalQuestion}
                  </span>
                  <span className='text-sm text-gray-600 flex items-center gap-1'>
                  <Clock className='text-blue-500' size={15} /> {course.duration}
                  </span>
                </div>
                <div className='flex justify-between items-center gap-3 mt-3'>
                  <div className='flex items-center gap-1'>
                    <Star className='text-yellow-500' size={15} />
                    <span className='text-sm text-black'>{course.rating}</span>
                    <span className='text-sm text-black'>({course.ratingCount})</span>
                  </div>
                  <Link to={`../coursedetails/${course.id}`}>
                  
      <button className="mt-2 px-6 py-1 bg-transparent border-1 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white cursor-pointer transition duration-300">
                    View Details
                  </button>
                  </Link>
                </div>
    
               
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className="cursor-pointer p-2 disabled:opacity-50">
              <ArrowLeft className='text-blue-600' size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`cursor-pointer px-3 py-1 ${currentPage === i + 1 ? 'bg-blue-500 rounded-full text-white' : 'bg-gray-200 rounded-full'}`}
              >
                {i + 1}
              </button>
            ))}
            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="p-2 cursor-pointer  rounded-full disabled:opacity-50">
              <ArrowRight className='text-blue-600' size={20} />
            </button>
          </div>
        </div>
  );
};

export default ManageTests
