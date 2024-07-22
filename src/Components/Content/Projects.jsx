import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectsList from '../../All_Lists/ProjectsList';

function Projects() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id='Our Projects' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative'>
      <div className='absolute top-0 left-0 w-full h-[100px]'></div>
      <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-20 leading-normal uppercase text-silver-700 mt-[100px]'>
        Our Work
      </h1>
      <div className='flex flex-row gap-10'>
        {ProjectsList.slice(0, 2).map((project) => (
          <div key={project.id} data-aos={project.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center group'>
            <a target="_blank" href={project.link} rel="noopener noreferrer">
              <div className='relative h-[600px] w-[600px] overflow-hidden rounded-3xl border-2 border-silver-700 group-hover:border-silver-500 transition-all duration-300'>
                <img className='absolute inset-0 object-cover w-full h-full' src={project.image} alt="project" />
                {/* Add a div to create the glow effect */}
                <div className='absolute inset-0 border-2 border-silver-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-silver-glow'></div>
              </div>
            </a>
            <p className='flex gap-2 h-full mt-6 justify-center text-silver-700 text-[22px] text-center'>
              {project.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

