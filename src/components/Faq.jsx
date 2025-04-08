import React, { useState } from "react";
import { faqs } from "../constants";
import expand from "../assets/images/icons/expand.png";
import collapse from "../assets/images/icons/collapse.png";
import shape1 from "../assets/images/shapes/shape-1.png";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white mt-6 md:mt-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side - Subscription Form */}
        <div className="relative space-y-6 flex-1">
          <div className="absolute -top-3 right-40 w-16 h-16">
            <img src={shape1} alt="Lot Of Choices" className="w-32" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Got A Question For PrepMate?
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-md">
            If there are questions you want to ask, we will answer all your questions.
          </p>
          <div className="flex border border-blue-600 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 px-4 py-2 text-lg text-gray-500 focus:outline-none"
            />
            <button className="bg-blue-600 text-white px-6 py-2 md:px-10 md:py-5 rounded-full hover:bg-blue-500 hover:text-white transition duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] cursor-pointer">
              Submit
            </button>
          </div>
        </div>

        {/* Right Side - FAQ List */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xl md:text-2xl mt-6 md:mt-0 font-medium text-gray-900">
            Maybe your question has already been answered, check this out.
          </h3>
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
    </section>
  );
};

export default Faq;
