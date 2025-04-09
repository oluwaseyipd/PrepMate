import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import emptyImage from '../../assets/images/empty.png';
import { PlusCircle, BookIcon, Clock, Star } from 'lucide-react';
import { categoryStyles } from '../../constants/courses';

const COURSES_PER_PAGE = 12;

const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
    setMyCourses(storedCourses);
  }, []);

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  const removeCourse = (courseId) => {
    const updatedCourses = myCourses.filter((course) => course.id !== courseId);
    setMyCourses(updatedCourses);
    localStorage.setItem('myCourses', JSON.stringify(updatedCourses));
  };

  // Pagination logic
  const indexOfLastCourse = currentPage * COURSES_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - COURSES_PER_PAGE;
  const currentCourses = myCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(myCourses.length / COURSES_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderCourses = () => {
    if (myCourses.length === 0) {
      return (
        <div className="flex flex-col mt-24 md:mt-36 items-center justify-center h-96">
          <img src={emptyImage} alt="No Courses" className="w-60 md:w-90 mb-4" />
          <p className="text-gray-500">No courses added yet. Start by adding a new course!</p>
        </div>
      );
    } else {
      return (
        <>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 my-2 gap-4">
            {currentCourses.map((course) => (
              <div key={course.id} className="flex flex-col bg-white border rounded-xl p-3 mt-5 md:mt-0 shadow transition">
                <img src={course.image} alt={course.title} className="w-full h-42 object-cover rounded" />
                <button
                  onClick={() => removeCourse(course.id)}
                  className="relative -top-40 -right-50 w-30 mt-2 px-6 py-1 bg-blue-600 border border-blue-600 text-white rounded-full hover:bg-transparent hover:text-blue-600 transition"
                >
                  Remove
                </button>
                <div className="mt-3">
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
                    <p className="text-sm text-gray-600">
                      Created by <span className="text-black font-bold">{course.author}</span>
                    </p>
                  </div>
                </div>
                <hr className="mt-3 border border-blue-100" />
                <div className="flex justify-start items-center gap-3 mt-3">
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <BookIcon className="text-blue-500" size={15} /> {course.totalQuestion}
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Clock className="text-blue-500" size={15} /> {course.duration}
                  </span>
                </div>
                <div className="flex justify-between items-center gap-3 mt-3">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" size={15} />
                    <span className="text-sm text-black">{course.rating}</span>
                    <span className="text-sm text-black">({course.ratingCount})</span>
                  </div>
                  <Link to={`../mycoursedetails/${course.id}`}>
                    <button className="mt-2 px-6 py-1 border border-blue-600 text-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`px-3 py-1 rounded-full text-sm border ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      );
    }
  };

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

      {renderCourses()}
    </div>
  );
};

export default MyCourses;
