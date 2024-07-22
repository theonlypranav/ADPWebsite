import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectsList from '../../All_Lists/ProjectsList';
import { AiFillGithub } from 'react-icons/ai';

function Projects() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id='Our Projects' className='bg-black text-white p-20 flex flex-col items-center justify-center relative'>
      {/* Added relative positioning to ensure proper stacking */}
      <div className='absolute top-0 left-0 w-full h-[100px]'></div>
      {/* Spacer div with the height of the fixed navbar */}
      <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-20 leading-normal uppercase text-silver-700 mt-[100px]'>
        {/* Added margin-top to push content below the fixed navbar */}
        Our Work
      </h1>
      <div className='flex flex-row gap-10'>
        {ProjectsList.slice(0, 2).map((project) => (
          <div key={project.id} data-aos={project.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
            <a target="_blank" href={project.link} rel="noopener noreferrer">
              <div className='relative h-[600px] w-[600px] overflow-hidden rounded-3xl border-2 border-silver-700'>
                <img className='absolute inset-0 object-cover w-full h-full' src={project.image} alt="project" />
              </div>
            </a>
            <p className='flex gap-2 h-full mt-4 justify-center text-silver-700 text-center'>
              {project.title}
              <a target="_blank" href={project.github} rel="noopener noreferrer" className='hover:text-silver-500 transition-all duration-150 ease-in-out text-[20px]'>
                <AiFillGithub />
              </a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;

