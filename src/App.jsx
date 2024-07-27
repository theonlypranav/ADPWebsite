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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Endpoint from './Components/Content/endpoint';
import Treedesign from './Components/Content/Treedesign'
import LoadingScreen from './LoadingScreen'; // Import the new LoadingScreen component
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);

  // For loading screen
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <Router>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Routes>
          <Route path="/slideshow" element={
            <>
              <Navbar />
              <Slideshow />
              <Footer />
            </>
          } />
        <Route path="/endpoint" element={
            <>
              <Navbar />
              <Endpoint />
              <Footer />
            </>
          } />
          <Route path="/treedesign" element={
            <>
              <Navbar />
              <Treedesign />
              <Footer />
            </>
          } />
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
