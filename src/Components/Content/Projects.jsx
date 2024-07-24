import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectsList from '../../All_Lists/ProjectsList';
import { FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Projects() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSlideshowClick = (e) => {
    e.stopPropagation(); // Stop event propagation
    console.log("Slideshow button clicked");
    navigate('/endpoint');
  };

  return (
    <div id='Our Projects' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative'>
      
      <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-8 leading-normal uppercase text-silver-700'>
        Our Projects
      </h1>
      
      <div className='flex flex-row gap-10'>
        {ProjectsList.slice(0, 2).map((project) => (
          <div key={project.id} data-aos={project.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center group'>
            <Link to={`${project.link}?description=${project.description}`}>
              <div className='relative h-[400px] w-[400px] overflow-hidden rounded-3xl border-2 border-silver-700 group-hover:border-silver-500 transition-all duration-300'>
                <img className='absolute inset-0 object-cover w-full h-full' src={project.image} alt="project" />
                <div className='absolute inset-0 border-2 border-silver-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-silver-glow'></div>
              </div>
              <p className='flex gap-2 h-full mt-4 justify-center text-silver-700 text-[36px] text-center cursor-pointer'>
                {project.title}
              </p>
            </Link>
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
}

export default Projects;

