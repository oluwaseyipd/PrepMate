import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import team1 from '../assets/images/teams/team-1.png';
import mission1 from '../assets/images/mission-1.png';
import mission2 from '../assets/images/mission-2.png';
import vision from '../assets/images/vision.png';

const AboutBody = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="py-20 text-center bg-white">
        <h1 className="text-5xl font-bold mb-4">About PrepMate</h1>
        <p className="text-lg text-gray-500 max-w-3xl mx-auto">
          Empowering students with the best tools to excel in their tests and exams.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-500 mb-6">
              At PrepMate, our mission is to help students unlock their full potential by providing a
              comprehensive testing platform, designed with intuitive features to track progress and improve performance.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" />
                Personalized learning experiences
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" />
                Detailed performance analytics
              </li>
              <li className="flex items-center gap-2">
                <FaCheckCircle className="text-blue-500" />
                Easy access to study resources
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 relative">
            <img
              src={mission1}
              alt="Mission Image 1"
              className="rounded-xl shadow-lg w-full"
            />
            <img
              src={mission2}
              alt="Mission Image 2"
              className="rounded-xl shadow-lg w-2/3 absolute -bottom-20 -left-10 border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src={vision}
              alt="Vision Image"
              className="w-full rounded-xl shadow-lg"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-500">
              We envision a future where every student has access to quality educational resources, 
              enabling them to reach their academic goals with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* How PrepMate Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-8">How PrepMate Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Create an Account</h3>
              <p className="text-gray-500">Sign up and set up your personalized dashboard.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Take Tests</h3>
              <p className="text-gray-500">Access a variety of tests across different subjects.</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">Track Your Progress</h3>
              <p className="text-gray-500">Monitor your performance with detailed analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PrepMate Team Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-4xl font-bold mb-8">Meet the PrepMate Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Example team member */}
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <img src={team1} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-semibold">John Doe</h3>
              <p className="text-gray-500">Frontend Developer</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <img src={team1} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-semibold">Jane Smith</h3>
              <p className="text-gray-500">Backend Developer</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <img src={team1} alt="Team Member" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-2xl font-semibold">Oluwaseyi</h3>
              <p className="text-gray-500">Project Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutBody;
