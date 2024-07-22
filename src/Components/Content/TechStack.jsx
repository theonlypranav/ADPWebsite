import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TechStackList from '../../All_Lists/TechStackList';

function TechStack() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id='Our Team' className='bg-black text-white p-20 flex flex-col items-center justify-center'>
      <h1 data-aos='fade-right' className='text-[72px] font-semibold mb-4 leading-normal uppercase text-silver-700'>Our Team</h1>
      <p className='text-lg mb-20 text-center'>Meet the passionate and dedicated members who make up our incredible team.</p>
      
      <div className='flex flex-col items-center'>
        <div className='flex flex-row gap-28'> {/* Increased gap */}
          {TechStackList.slice(0, 2).map((tech, index) => (
            <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
              <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-56 w-56'>
                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
              </div>
              <h2 className='text-[32px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
              <h3 className='text-[28px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
            </div>
          ))}
        </div>

        <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-around gap-20 mt-10'>
          {TechStackList.slice(2).map((tech, index) => (
            <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
              <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-36 w-36'>
                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
              </div>
              <h2 className='text-[26px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
              <h3 className='text-[20px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TechStack;
