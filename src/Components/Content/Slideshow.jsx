import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TechStackList2 from '../../All_Lists/TechStackList2';

const Slideshow = () => {
  const navigate = useNavigate();

  const handleSlideshow = () => {
    navigate('/slideshow');
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="slideshow bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative">
      <h1 className="text-6xl font-bold mb-4">Oasis Through The Years</h1>
      <p className="text-m mb-8">There will be 1 major structure outside the central Audi, 1 front structure in front of the clock tower, a structure in FD-2, and 2-3 photo booths.
      There will be 2 panels outside the Audi, 1 backdrop for the Auditorium, and additional inside and small panels.</p>
      
      <button 
        className='absolute top-4 right-4 bg-silver-700 text-white py-2 px-4 rounded hover:bg-silver-500 transition duration-300'
        onClick={handleSlideshow}
      >
        Slideshow
      </button>
      <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-x-12 gap-y-10 mt-10'>
        {TechStackList2.slice(2).map((tech, index) => (
          <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
            <Link to={`${tech.link}?description=${tech.description}`}>
              <div className='text-silver-800 rounded-2xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-48 w-80 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow'>
                <img className='h-full w-full object-cover rounded-2xl' src={tech.image} alt={tech.title} />
              </div>
            </Link>
            <h2 className='text-[26px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;