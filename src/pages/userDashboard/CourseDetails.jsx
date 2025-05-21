import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { courses, categoryStyles } from '../../constants/courses';
import { MarsStroke, Share2, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";

const CourseDetails = () => {
  const { id } = useParams();
  const course = courses.find((course) => course.id.toString() === id);

  const [message, setMessage] = useState(null); // { text: "", type: "success" | "error" }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

  const handleAddCourse = () => {
    const existingCourses = JSON.parse(localStorage.getItem('myCourses')) || [];
    if (!existingCourses.some((c) => c.id === course.id)) {
      existingCourses.push(course);
      localStorage.setItem('myCourses', JSON.stringify(existingCourses));
      setMessage({ text: 'A new course has been added', type: 'success' });
    } else {
      setMessage({ text: 'The course already exist in your folder', type: 'error' });
    }
  };

  if (!course) return <div className="p-4 text-black">Course not found.</div>;

  return (
    <div className="relative p-4">
      {/* Floating Message */}
      {message && (
        <div
          className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-3 md:px-6 py-2 shadow-lg text-white ${
            message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {message.text}
        </div>
      )}

            {/* Heading */}
            <div className="flex items-center gap-3 text-gray-700 mb-5">
              <h1 className="text-2xl font-bold text-black">Course Details</h1>
              |
              <Link to="/dashboard/overview"
              className="flex items-center gap-2 text-gray-500 text-sm ml-2">
                <FaHouse className="text-gray-500" size={15} />
                Overview 
              </Link>
      
            </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Content */}
        <div className="flex flex-col w-full md:w-2/3 bg-white p-5 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl md:text-3xl text-black">{course.title}</h2>
              <p className="text-black text-lg">{course.author}</p>
            </div>
            <div className="flex items-center gap-4 mt-3 md:mt-0">
              {(() => {
                const category = toTitleCase(course.category);
                const styles = categoryStyles[category] || categoryStyles.default;
                return (
                  <span className={`py-1 px-4 rounded-full text-sm ${styles.bg} ${styles.text}`}>
                    {category}
                  </span>
                );
              })()}
              <Share2 className="text-gray-700 cursor-pointer" size={25} />
              <button
                onClick={handleAddCourse}
                className="px-6 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition"
              >
                Add Course
              </button>
            </div>
          </div>

          <div className="h-[250px] md:h-[500px] mt-4">
            <img
              src={course.image}
              className="w-full h-full object-cover rounded-sm"
              alt={course.title}
            />
          </div>

          {/* About the Course */}
          <div className="mt-4 pb-6 border-b border-gray-300">
            <h2 className="text-black text-xl font-bold mb-2">About the Course</h2>
            <p className="text-gray-600">{course.description}</p>
          </div>

          {/* Course Content */}
          <div className="mt-5 pb-6 border-b border-gray-300">
            <h2 className="text-black text-xl font-bold mb-3">Course Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.content?.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <MarsStroke className="text-blue-500" size={20} />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Author Info */}
          <div className="mt-5">
            <h2 className="text-black text-xl font-bold mb-3">Author</h2>
            <div className="flex items-center gap-3">
              <img
                src={course.authorImage}
                className="w-10 h-10 rounded-full"
                alt={course.author}
              />
              <div>
                <h3 className="text-black font-medium">{course.author}</h3>
                <p className="text-gray-500 text-sm">{course.category} Teacher</p>
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-500" size={15} />
                  <span className="text-sm text-black">{course.rating}</span>
                  <span className="text-sm text-black">({course.ratingCount})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-1/3 flex flex-col gap-5">
          <div className="p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-black text-xl font-bold mb-3">Course Info</h2>
            <p className="text-gray-500 text-sm">
              Total Questions: <span className="text-gray-600">{course.totalQuestion}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Duration: <span className="text-gray-600">{course.duration}</span>
            </p>
            <p className="text-gray-500 text-sm">
              Rating: <span className="text-gray-600">{course.rating} ({course.ratingCount})</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
