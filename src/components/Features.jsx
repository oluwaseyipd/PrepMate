import React from 'react';
import categories from "../assets/images/features/categories.png";
import leaderboard from "../assets/images/features/leaderboard.png";
import progress from "../assets/images/features/progress.png";
import timed from "../assets/images/features/timed.png";
import shape1 from "../assets/images/shapes/shape-2.png";

const Features = () => {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header and Features in Flex */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          {/* Header */}
          <div className="relative lg:max-w-md space-y-4 flex-shrink-0">
            {/* Decorative Shape */}
            <div className="absolute -top-10 -left-10 w-16 h-16">
              <img src={shape1} alt="Decorative Shape" className="w-32" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
              That’s The Way To Camp!
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Try a variety of benefits when using our services.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 flex-grow">
            {/* Feature Items */}
            {[
              { img: categories, title: "Lot Of Choices", desc: "We have 1K+ camping destinations working with us." },
              { img: leaderboard, title: "Best Camp Guide", desc: "Our camp guide is ready to help you anytime & anywhere." },
              { img: progress, title: "Easy Booking", desc: "Easy, safe, and fast ticket purchase process." },
              { img: timed, title: "Secure Payment", desc: "Your transactions are protected with top security." },
              { img: leaderboard, title: "Expert Guidance", desc: "Expert-led sessions for the best camping experiences." },
              { img: progress, title: "Customer Support", desc: "24/7 dedicated customer support service." }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center md:items-start mt-6 md:mt-0 space-y-4">
                <img src={feature.img} alt={feature.title} className="w-16 h-16" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-500 text-sm md:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
