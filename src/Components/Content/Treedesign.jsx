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
        <div className="absolute bottom-0 w-1 bg-red-500 h-full"></div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-b-8 border-red-500"></div>
        <div className="mt-10 flex flex-col items-center w-full relative">
          {heads.map((tech, index) => (
            <div
              key={index}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} w-full my-8 relative px-4 sm:px-6 md:px-10 lg:px-20`}
            >
              {/* Branch connecting to the image */}
              <div className={`absolute ${index % 2 === 0 ? 'left-1/3 sm:left-1/4 md:left-1/5 lg:left-1/6 transform -translate-x+1/2' : 'right-1/4 sm:right-1/3 md:right-1/4 lg:right-1/5 transform -translate-x-1/2'} bottom-0 flex items-center`}>
                <div className="w-24 sm:w-32 md:w-40 lg:w-48 h-1 bg-red-500"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-silver-800 rounded-full border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow">
                  <img className="h-full w-full object-cover rounded-full" src={tech.image} alt={tech.title} />
                </div>
                <h2 className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] font-semibold mt-4 text-center text-silver-700">{tech.title}</h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-2 text-center text-silver-500">{tech.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Treedesign;
