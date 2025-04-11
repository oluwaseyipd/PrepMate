import React from 'react';
import Navbar from '../components/Navbar';
import AboutBody from '../components/AboutBody';
import Testimonials from '../components/Testimonials';
import Faq from '../components/Faq';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutBody />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  );
};

export default About;