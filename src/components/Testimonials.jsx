import React from "react";
import Slider from "react-slick";
import { userTestimony } from "../constants";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import shape1 from "../assets/images/shapes/shape-2.png";


const testimonials = () => {
  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 5000, // Delay between slides in milliseconds
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    arrows: true,
  };

  return (
    <section className="w-full py-16 bg-white  mt-6 md:mt-16">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="relative text-left space-y-4 mb-12 max-w-xl mx-auto md:mx-0">
          {/* Decorative Shape */}
          <div className="absolute -top-10 -left-10 w-16 h-16">
                  <img src={shape1} alt="Lot Of Choices" className="w-32" />
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
    Satisfied Customers Are Our Best Ads.
  </h2>
        </div>

        {/* Slider */}
        <Slider {...settings}
        // Adds space to the container edges

        >
          {userTestimony.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 space-y-4 bg-white rounded-xl"
            >
              {/* Quote */}
              <div className="text-blue-600 text-8xl leading-none">“</div>

              {/* Review Text */}
              <p className="text-gray-600 text-2xl">{testimonial.text}</p>

              <div className="border-b border-gray-200"></div>

              {/* Reviewer Info */}
              <div className="flex items-center space-x-4 pt-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  {/* Star Rating */}
                  <div className="flex space-x-1 text-yellow-400 text-xl">
                    {Array(4)
                      .fill()
                      .map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    <span className="text-gray-300">★</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default testimonials;
