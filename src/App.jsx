import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Header/Navbar';
import Home from './Components/Content/Home';
import About from './Components/Content/About';
import TechStack from './Components/Content/TechStack';
import Projects from './Components/Content/Projects';
import Contact from './Components/Content/Contact';
import Footer from './Components/Footer/Footer';
import Slideshow from './Components/Content/Slideshow'; // Import the new Slideshow component
import { BallTriangle } from 'react-loader-spinner';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Endpoint from './Components/Content/Endpoint';

function App() {
  const [loading, setLoading] = useState(false);

  // For loading screen
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Router>
      {loading ? (
        <div className="bg-black h-[100vh] flex justify-center items-center">
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#BABABB"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <Routes>
          <Route path="/slideshow" element={<Slideshow />} />
          <Route path="/endpoint" element={<Endpoint />} />

          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <About />
              <Projects />
              <TechStack />
              <Contact />
              <Footer />
              <Analytics />
              <SpeedInsights />
            </>
          } />
        </Routes>
      )}
    </Router>
  );
}

export default App;