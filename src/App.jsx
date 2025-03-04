import React from 'react';
import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import Register from './pages/Register';

// Dashboard
import Overview from './pages/user-dashboard/Overview';
import Sidebar from "./components/user-dashboard/Sidebar";

// Components
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";
// import WhatsAppButton from "./components/WhatsAppButton";
// import MetaTags from "./components/MetaTags";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  return (
    <>
      {/* <MetaTags /> */}
      {isLoading ? (
        <Loader />
      ) : (
        <Router>
          <ScrollToTop />
          <div>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/signin" element={<SignIn />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard/*"
      element={
        <div className="flex-1">
          <Sidebar />
          <Overview />
        </div>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
  {/* <WhatsAppButton phone="+2348112345678" message="Hello! I need help with PrepMate." /> */}
</div>

          
        </Router>
      )}
    </>
  );
}

export default App;
