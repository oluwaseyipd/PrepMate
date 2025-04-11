import React from "react";
import { team } from "../constants/index.jsx";
import {
  FaCheckCircle,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import team1 from "../assets/images/teams/team-1.png";
import mission1 from "../assets/images/mission-1.png";
import mission2 from "../assets/images/mission-2.png";
import vision from "../assets/images/vision.png";

const AboutBody = () => {
  return (
    <section className="w-full py-16 bg-white text-gray-800">
      <div className=" ">
        {/* Hero Section */}
        <section className=" container mx-auto px-4 py-8 md:py-20  text-center bg-white">
          <h1 className="text-5xl font-bold mb-4">About PrepMate</h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Empowering students with the best tools to excel in their tests and
            exams.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="container mx-auto px-4 py-20 md:py-10 mb-20 md:mb-30">
          <div className="mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-500 mb-6">
                At PrepMate, our mission is to help students unlock their full
                potential by providing a comprehensive testing platform,
                designed with intuitive features to track progress and improve
                performance.
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
                className="rounded-xl shadow-lg w-2/3 absolute -bottom-20 left-10 md:-left-10 border-4 border-white"
              />
            </div>
          </div>
        </section>

        {/* Full-width gradient background wrapper */}
        <div className="w-full bg-gradient-to-l from-blue-50 to-white py-16 mb-20">
          {/* Content Wrapper (Centers content while background stays full width) */}
          <div className="container mx-auto px-4 md:px-0">
            {/* Our Vision Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Vision Image */}
              <div className="md:w-2/3 w-full">
                <img src={vision} alt="Vision Image" className="w-full " />
              </div>
              {/* Vision Content */}
              <div className="md:w-1/3">
                <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
                <p className="text-gray-500">
                  We envision a future where every student has access to quality
                  educational resources, enabling them to reach their academic
                  goals with confidence.
                </p>
              </div>
            </div>

            {/* How PrepMate Works Section */}
            <div className="text-center mt-30">
              <h2 className="text-4xl font-bold mb-8">How PrepMate Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    Create an Account
                  </h3>
                  <p className="text-gray-500">
                    Sign up and set up your personalized dashboard.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">Take Tests</h3>
                  <p className="text-gray-500">
                    Access a variety of tests across different subjects.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-2">
                    Track Your Progress
                  </h3>
                  <p className="text-gray-500">
                    Monitor your performance with detailed analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 container mx-auto px-4">
          <div className="mx-auto lg:px-12 text-center">
            <h4 className="text-3xl font-bold mb-8 text-center">
              Meet PrepMate Team
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-20">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="flex md:flex-row flex-col space-x-5 items-center text-center  bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition duration-300 hover:shadow-blue-200"
                >
                  <div className="relative w-50 h-50 rounded-full bg-gray-200 mb-4 overflow-hidden border-5 border-blue-200">
                    <img
                      src={team1}
                      alt="Team Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left mt-3 md:mt-0 w-full md:w-1/2">
                    <h5 className="text-lg font-semibold">{member.name}</h5>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <hr className="border border-gray-200 my-4" />
                    <p className="text-xs text-gray-400 mt-2">
                      {member.description}
                    </p>
                    <div className="flex justify-start space-x-3 mt-3">
                      <div className="h-10 w-10 p-2 flex items-center justify-center rounded-full bg-gray-200">
                        <FaTwitter className="text-blue-400 text-3xl cursor-pointer" />
                      </div>
                      <div className="h-10 w-10 p-2 flex items-center justify-center rounded-full bg-gray-200">
                        <FaLinkedin className="text-blue-700 text-3xl cursor-pointer" />
                      </div>
                      <div className="h-10 w-10 p-2 flex items-center justify-center rounded-full bg-gray-200">
                        <FaInstagram className="text-pink-500 text-3xl cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBody;
