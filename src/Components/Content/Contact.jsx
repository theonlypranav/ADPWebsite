import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DevsList from '../../All_Lists/DevsList';

function Developers() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageClick = (linkedin) => {
    window.open(linkedin, "_blank");
  };

  return (
    <div id='TheDevelopers' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-6 md:p-10 lg:p-20 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden'>
      <div className="top-transition"></div>
      <h1 data-aos='fade-right' className='text-[24px] sm:text-[32px] md:text-[40px] lg:text-[60px] font-semibold mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-normal text-silver-700 uppercase'>
        The Developers
      </h1>
      <p data-aos='fade-left' className='text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] xl:text-[22px] mb-12 sm:mb-16 md:mb-20 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
        Meet the passionate and dedicated developers who make up our incredible team.
      </p>
      
      <div className='flex flex-col items-center'>
        <div className='flex flex-wrap gap-6 justify-center'>
          {DevsList.slice(0, 6).map((tech, index) => (
            <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
              <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-[80px] w-[80px] sm:h-[120px] sm:w-[120px] md:h-[150px] md:w-[150px] lg:h-[200px] lg:w-[200px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.linkedin)}>
                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
              </div>
              <h2 style={{ fontFamily: 'Poppins', letterSpacing: 0.4 }} className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-semibold mt-3 text-center text-silver-700'>{tech.title}</h2>
              <h3 style={{ fontFamily: 'Poppins', letterSpacing: 0.4 }} className='text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Developers;
