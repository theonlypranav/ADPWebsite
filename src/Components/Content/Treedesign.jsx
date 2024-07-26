import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';
import oasisheads from '../../All_Lists/oasisheads';
import apogeeheads from '../../All_Lists/apogeeheads';

const Treedesign = () => {
  const [heads, setHeads] = useState([]);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);

    const query = new URLSearchParams(location.search);
    const description = query.get('param');

    if (description === 'stuccan') {
      setHeads(oasisheads);
    } else {
      setHeads(apogeeheads);
    }
  }, [location.search]);

  return (
    <div className="relative bg-custom-light text-black dark:bg-custom-dark dark:text-white p-4 sm:p-6 md:p-10 lg:p-20 flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center">
        {location.search.includes('stuccan') ? "Our StuCCAn's over the years..." : "Our CoStAAn's over the years..."}
      </h1>

      <div className="relative w-full flex flex-col items-center mt-20">
        {/* Central Arrow */}
        <div className="absolute bottom-0 w-5 bg-red-500 h-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-12 border-r-12 border-b-24 border-red-500"></div>
        {/* Arrowhead at the top of the central arrow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-b-10 border-red-500"></div>

        <div className="mt-10 flex flex-col items-center w-full relative">
          {heads.map((tech, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} w-full my-8 relative`}
            >
              {/* Branch connecting to the image */}
              <div className={`absolute ${index % 2 === 0 ? 'left-1/3 transform -translate-x+1/2' : 'right-1/4 transform -translate-x-1/2'} bottom-0 flex items-center`}>
                <div className="w-48 h-5 bg-red-500"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-silver-800 rounded-full border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-48 w-48 sm:w-56 md:w-64 lg:w-72 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow">
                  <img className="h-full w-full object-cover rounded-full" src={tech.image} alt={tech.title} />
                </div>
                <h2 className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-semibold mt-4 text-center text-silver-700">{tech.title}</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 text-center text-silver-500">{tech.subtitle}</p> {/* Subtitle */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treedesign;