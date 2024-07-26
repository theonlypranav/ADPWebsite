import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DevsList from '../../All_Lists/DevsList';

function Developers() {
  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageClick = (linkedin) => {
    window.open(linkedin, "_blank");
  };

  return (
    <div id='The Developers' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-10 md:p-20 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden'>
      <h1 data-aos='fade-right' className='text-[32px] sm:text-[40px] md:text-[52px] font-semibold mb-4 leading-normal uppercase text-silver-700'>
        The Developers
      </h1>
      <p data-aos='fade-left' className='text-base sm:text-lg md:text-xl mb-20 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
        Meet the passionate and dedicated developers who make up our incredible team.
      </p>
      
      <div className='flex flex-col items-center'>
        <div className='flex flex-row flex-wrap gap-6 justify-center'>
          {DevsList.slice(0, 6).map((tech, index) => (
            <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
              <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-[100px] w-[100px] sm:h-[150px] sm:w-[150px] md:h-[200px] md:w-[200px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.linkedin)}>
                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
              </div>
              <h2 className='text-[16px] sm:text-[20px] md:text-[24px] font-semibold mt-3 text-center text-silver-700'>{tech.title}</h2>
              <h3 className='text-[14px] sm:text-[16px] md:text-[18px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Developers;