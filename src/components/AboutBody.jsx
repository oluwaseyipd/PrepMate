import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
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

// The AboutBody component renders the "About Us" page, including sections for the mission, vision, how PrepMate works, and the team.
const AboutBody = () => {
  // Initialize AOS (Animate On Scroll) for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation happens only once
    });
  }, []);

  return (
    <section className="w-full py-16 bg-white text-gray-800">
      <div className=" ">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-8 md:py-20 text-center bg-white">
          <h1 className="text-5xl font-bold mb-4">About PrepMate</h1>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Empowering students with the best tools to excel in their tests and
            exams.
          </p>
        </section>

        {/* Our Mission Section */}
        <section className="container mx-auto px-4 py-20 md:py-10 mb-20 md:mb-30">
          <div className="mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12">
            {/* Mission Content */}
            <div className="lg:w-1/2" data-aos="fade-right">
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
            {/* Mission Images */}
            <div className="lg:w-1/2 relative">
              <img
                src={mission1}
                alt="Mission Image 1"
                className="rounded-xl shadow-lg w-full"
                data-aos="fade-left"
              />
              <img
                src={mission2}
                alt="Mission Image 2"
                className="rounded-xl shadow-lg w-2/3 absolute -bottom-20 left-10 md:-left-10 border-4 border-white"
                data-aos="fade-up"
              />
            </div>
          </div>
        </section>

        {/* Full-width gradient background wrapper */}
        <div className="w-full bg-gradient-to-l from-blue-50 to-white py-16 mb-20">
          <div className="container mx-auto px-4 md:px-0">
            {/* Our Vision Section */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
              {/* Vision Image */}
              <div className="md:w-2/3 w-full" data-aos="fade-right">
                <img src={vision} alt="Vision Image" className="w-full " />
              </div>
              {/* Vision Content */}
              <div className="md:w-1/3" data-aos="fade-left">
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
                {/* Step 1 */}
                <div
                  className="p-6 bg-white rounded-xl shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  <h3 className="text-2xl font-semibold mb-2">
                    Create an Account
                  </h3>
                  <p className="text-gray-500">
                    Sign up and set up your personalized dashboard.
                  </p>
                </div>
                {/* Step 2 */}
                <div
                  className="p-6 bg-white rounded-xl shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <h3 className="text-2xl font-semibold mb-2">Take Tests</h3>
                  <p className="text-gray-500">
                    Access a variety of tests across different subjects.
                  </p>
                </div>
                {/* Step 3 */}
                <div
                  className="p-6 bg-white rounded-xl shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay="1800"
                >
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
                  className="flex md:flex-row flex-col space-x-5 items-center text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-lg transition duration-300 hover:shadow-blue-200"
                  data-aos="fade-up"
                  data-aos-delay={index * 200} // Delay animations for each team member
                  data-aos-duration="1000"
                >
                  {/* Team Member Image */}
                  <div className="relative w-50 h-50 rounded-full bg-gray-200 mb-4 overflow-hidden border-5 border-blue-200">
                    <img
                      src={team1}
                      alt="Team Member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Team Member Details */}
                  <div className="text-left mt-3 md:mt-0 w-full md:w-1/2">
                    <h5 className="text-lg font-semibold">{member.name}</h5>
                    <p className="text-sm text-gray-500">{member.role}</p>
                    <hr className="border border-gray-200 my-4" />
                    <p className="text-xs text-gray-400 mt-2">
                      {member.description}
                    </p>
                    {/* Social Media Links */}
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