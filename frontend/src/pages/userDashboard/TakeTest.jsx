import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, BookIcon, Clock, Star } from "lucide-react";
import emptyImage from "../../assets/images/empty.png";
import { useModal } from "../../context/ModalContext";
import { categoryStyles } from '../../constants/courses';
import { courses } from "../../constants/courses";
import { FaHouse } from "react-icons/fa6";

const COURSES_PER_PAGE = 12;

const TakeTest = () => {
  const { setShowStartTestPrompt } = useModal();
  const navigate = useNavigate();
  
  const [submittedCourses, setSubmittedCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Load submitted courses from localStorage
  useEffect(() => {
    const fetchSubmittedCourses = () => {
      try {
        // Get test data
        const storedSubmittedTests = JSON.parse(localStorage.getItem('submittedTests')) || [];
        
        // If we have valid course data, use it
        if (Array.isArray(storedSubmittedTests) && storedSubmittedTests.length > 0) {
          console.log("Loaded submitted courses:", storedSubmittedTests.length);
          setSubmittedCourses(storedSubmittedTests);
        } else {
          console.log("No submitted courses found in localStorage");
        }
      } catch (error) {
        console.error("Error loading submitted courses:", error);
      }
    };

    fetchSubmittedCourses();
    
    // Add event listener to refresh the list when storage changes
    window.addEventListener('storage', fetchSubmittedCourses);
    
    return () => {
      window.removeEventListener('storage', fetchSubmittedCourses);
    };
  }, []);

  const toTitleCase = (str) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  // Pagination logic
  const indexOfLastCourse = currentPage * COURSES_PER_PAGE;
  const indexOfFirstCourse = indexOfLastCourse - COURSES_PER_PAGE;
  const currentCourses = submittedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(submittedCourses.length / COURSES_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle start test directly from this page
  const handleStartTest = (courseId) => {
    // First, find the course
    const course = courses.find(c => c.id === courseId);
    
    if (!course) {
      console.error("Course not found with id:", courseId);
      return;
    }
    
    // Configure the start test modal with the course ID and a direct navigation function
    setShowStartTestPrompt({
      show: true, 
      courseId: courseId,
      onConfirm: () => {
        navigate('/dashboard/testinterface', { 
          state: { 
            courseId: courseId,
            courseTitle: course.title,
            courseCategory: course.category,
            courseDuration: course.duration
          } 
        });
      }
    });
  };

  const renderCourses = () => {
    if (submittedCourses.length === 0) {
      return (
        <div className="flex flex-col mt-24 md:mt-36 items-center justify-center h-96">
          <img src={emptyImage} alt="No Courses" className="w-60 md:w-90 mb-4" />
          <p className="text-gray-500">No completed tests available. Complete a test first!</p>
        </div>
      );
    } else {
      return (
        <>
          <div className="md:grid md:grid-cols-2 lg:grid-cols-4 my-2 gap-4">
            {currentCourses.map((course) => (
              <div key={course.id} className="flex flex-col bg-white border rounded-xl p-3 mt-5 md:mt-0 shadow transition">
                <img src={course.image} alt={course.title} className="w-full h-42 object-cover rounded" />
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
                <div className="flex justify-between items-center my-3">
                  <div className="flex justify-start items-center gap-3">
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <BookIcon className="text-blue-500" size={15} /> {course.totalQuestion}
                    </span>
                    <span className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="text-blue-500" size={15} /> {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500" size={15} />
                    <span className="text-sm text-black">{course.rating}</span>
                    <span className="text-sm text-black">({course.ratingCount})</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <Link
                    to={`../mycoursedetails/${course.id}`}
                    className="border px-4 py-2 border-blue-600 text-blue-600 rounded-full cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleStartTest(course.id)}
                    className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full transition duration-300"
                  >
                    Retake Test
                  </button>
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
  <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                             {/* Heading */}
                     <div className="flex items-center gap-3 text-gray-700 mb-5">
                       <h1 className="text-2xl font-bold text-black">Attempted Tests</h1>
                       |
                       <Link to="/dashboard/overview"
                       className="flex items-center gap-2 text-gray-500 text-sm ml-2">
                         <FaHouse className="text-gray-500" size={15} />
                         Overview 
                       </Link>
               
                     </div>
        <Link
          to="/dashboard/mycourses"
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          <PlusCircle size={20} />
          <span>Take A Test</span>
        </Link>
      </div>

      {renderCourses()}

    </div>
  );
};

export default TakeTest;