import React, { useState } from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { faqs } from "../constants";
import expand from "../assets/images/icons/expand.png";
import collapse from "../assets/images/icons/collapse.png";
import shape1 from "../assets/images/shapes/shape-1.png";

// The ContactBody component renders the contact page, including a contact form, contact information, social media links, and an FAQ section.
const ContactBody = () => {
  // Initialize AOS (Animate On Scroll) for animations
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation happens only once
    });
  }, []);

  // State to track the active FAQ item
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle the active FAQ item
  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white mt-6 md:mt-16">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Header Section */}
        <div className="text-center my-10">
          <h2 className="text-4xl md:text-6xl text-black font-bold mb-4">
            Feel free to get in touch
          </h2>
          <p className="text-lg text-black max-w-xl mx-auto">
            With over 20 years of experience, we can deliver great results for
            your online business without additional costs or commitments.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 py-16">
          {/* Contact Form */}
          <div
            className="w-full lg:w-1/2 bg-white rounded-3xl p-8 shadow-2xl text-gray-800"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-bold mb-6">Leave your message</h3>
            <form className="space-y-4">
              {/* Input fields for name and email */}
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full md:w-1/2 px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 "
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full md:w-1/2 px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 "
                />
              </div>
              {/* Input field for subject */}
              <input
                type="text"
                placeholder="Subject"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 "
              />
              {/* Textarea for message */}
              <textarea
                placeholder="Message"
                className="w-full px-4 py-2 border-2 border-blue-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 "
              ></textarea>
              {/* Privacy policy agreement */}
              <div className="flex items-center gap-2">
                <input type="checkbox" className="cursor-pointer" />
                <label className="text-sm">I agree to the privacy policy</label>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r cursor-pointer from-blue-500 to-blue-700 text-white rounded-lg hover:from-blue-600 hover:to-blue-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="w-full lg:w-1/2 space-y-6" data-aos="fade-left">
            <h3 className="text-4xl md:text-5xl text-black font-bold mb-4">
              Don't hesitate to contact us
            </h3>
            <p className="text-gray-600">
              Sed ut perspiciatis unde omnis iste natus error sit amet
              voluptatem accusantium doloremque laudantium.
            </p>
            {/* Contact details such as office address, phone, working hours, and email */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              data-aos="fade-up"
              data-aos-delay="1200"
            >
              <div className="flex items-center gap-4 border border-gray-200 bg-white py-3 px-5 rounded-xl">
                <FaMapMarkerAlt className="text-blue-400 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
                <div>
                  <h3 className="text-2xl text-black">Office</h3>
                  <p className="text-black">Jl. Merdeka Raya No.738</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-gray-200 bg-white py-3 px-5 rounded-xl">
                <FaPhone className="text-blue-400 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
                <div>
                  <h3 className="text-2xl text-black">Phone</h3>
                  <p className="text-black">(021) 111 444 90</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-gray-200 bg-white py-3 px-5 rounded-xl">
                <FaClock className="text-blue-400 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
                <div>
                  <h3 className="text-2xl text-black">Working Hours</h3>
                  <p className="text-black">Everyday 09 am - 07 pm</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border border-gray-200 bg-white py-3 px-5 rounded-xl">
                <FaEnvelope className="text-blue-400 text-xl bg-blue-300 p-3 h-12 w-12 rounded-full" />
                <div>
                  <h3 className="text-2xl text-black">Email</h3>
                  <p className="text-black">blucorp@support.com</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div
              className="flex flex-col md:flex-row justify-between mt-12"
              data-aos="fade-up"
              data-aos-delay="1400"
            >
              <h4 className="text-2xl text-black font-bold mb-4">
                Social Media :
              </h4>
              <div className="flex space-x-4">
                <FaFacebook className="text-blue-600 text-2xl cursor-pointer border border-gray-300 p-2 rounded-full h-9 w-9 items-center" />
                <FaTwitter className="text-blue-400 text-2xl cursor-pointer border border-gray-300 p-2 rounded-full h-9 w-9 items-center" />
                <FaLinkedin className="text-blue-700 text-2xl cursor-pointer border border-gray-300 p-2 rounded-full h-9 w-9 items-center" />
                <FaInstagram className="text-pink-500 text-2xl cursor-pointer border border-gray-300 p-2 rounded-full h-9 w-9 items-center" />
                <FaYoutube className="text-red-500 text-2xl cursor-pointer border border-gray-300 p-2 rounded-full h-9 w-9 items-center" />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start mt-16 md:mt-30">
          {/* Left Side - Subscription Form */}
          <div className="relative space-y-6 flex-1">
            <div className="absolute -top-2 md:-top-3 -right-5 md:right-20 w-16 h-16">
              <img src={shape1} alt="Lot Of Choices" className="w-32" />
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
              Got A Question For Campty?
            </h2>
            <p className="text-gray-500 text-lg md:text-xl max-w-md">
              Maybe your question has already been answered, check this out.
            </p>
          </div>

          {/* Right Side - FAQ List */}
          <div className="w-full md:flex-1 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center py-4">
                  <h4 className="text-gray-800">{faq.question}</h4>
                  <img
                    src={activeIndex === index ? collapse : expand}
                    alt="Toggle"
                    className="w-6 h-6"
                  />
                </div>
                {activeIndex === index && (
                  <p className="text-gray-500 pb-4 transition-all duration-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBody;