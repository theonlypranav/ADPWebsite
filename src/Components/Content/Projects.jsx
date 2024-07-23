import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectsList from '../../All_Lists/ProjectsList';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Projects() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []
  return (
    <div id='Our Projects' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative'>
      {/* Slideshow Button with Box */}
      <div className='absolute top-4 right-4 border-2 border-silver-700 p-1 rounded z-50 pointer-events-auto'>
        <button 
          className='bg-silver-700 text-white py-2 px-4 rounded hover:bg-silver-500 transition duration-300'
          onClick={handleSlideshowClick}
        >
          webpage next
        </button>
      </div>
      
      <div className='absolute top-0 left-0 w-full h-[100px]'></div>
      <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-8 leading-normal uppercase text-silver-700 mt-[60px]'>
        Our Projects
      </h1>
      <p data-aos='fade-left' className='text-lg mb-8 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
        Meet the passionate and dedicated members who make up our incredible team.
      </p>
      <div className='flex flex-row gap-10'>
        {ProjectsList.slice(0, 2).map((project) => (
          <div key={project.id} data-aos={project.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center group'>
            <a target="_blank" href={project.link} rel="noopener noreferrer">
              <div className='relative h-[400px] w-[400px] overflow-hidden rounded-3xl border-2 border-silver-700 group-hover:border-silver-500 transition-all duration-300'>
                <img className='absolute inset-0 object-cover w-full h-full' src={project.image} alt="project" />
                <div className='absolute inset-0 border-2 border-silver-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-silver-glow'></div>
              </div>
            </a>
            <p className='flex gap-2 h-full mt-4 justify-center text-silver-700 text-[36px] text-center'>
              {project.title}
            </p>
            <div className='flex gap-4 mt-2'>
              <a href={project.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram className='text-silver-700 hover:text-silver-500 transition duration-300' size={24} />
              </a>
              <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className='text-silver-700 hover:text-silver-500 transition duration-300' size={24} />
              </a>
              <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className='text-silver-700 hover:text-silver-500 transition duration-300' size={24} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;