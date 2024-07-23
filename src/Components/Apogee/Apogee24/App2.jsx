import React, { useEffect, useState } from 'react';
import Navbar from '../../Header/Navbar';
import TechStack from './TechStack.jsx';
import Footer from '../../Footer/Footer';
import { BallTriangle } from 'react-loader-spinner';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

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
    <>
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
        <>
          <Navbar />
          <TechStack />
          <Footer />
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}

export default App;
