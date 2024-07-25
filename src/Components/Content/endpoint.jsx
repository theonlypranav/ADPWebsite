import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons

const Endpoint = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const description = query.get('description');

  const imageFolders = {
    'OASIS 2023': import.meta.glob('../../assets/OASIS 2023/*.{jpg,jpeg,png}'),
    'OASIS 2022': import.meta.glob('../../assets/OASIS 2022/*.{jpg,jpeg,png}'),
    'APOGEE 2024': import.meta.glob('../../assets/APOGEE 2024/*.{jpg,jpeg,png}'),
    'APOGEE 2023': import.meta.glob('../../assets/APOGEE 2023/*.{jpg,jpeg,png}'),
  };

  useEffect(() => {
    const loadImages = async () => {
      const imageContext = imageFolders[description];

      if (imageContext) {
        const imageModules = await Promise.all(
          Object.values(imageContext).map((importFn) => importFn())
        );
        setPhotos(imageModules.map((module) => module.default));
      }
    };

    loadImages();
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, [description]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
  const nextIndex = (currentIndex + 1) % photos.length;

  return (
    <div id='slideshow' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-10 flex flex-col items-center justify-center relative'>
      <h1 data-aos='fade-right' style={{ fontFamily: 'Anton', letterSpacing: '0.7px' }} className='text-[60px] font-normal mb-4 leading-normal uppercase text-silver-700 font-anton'>
        RELIVE THE MEMORIES
      </h1>
      <div className='relative w-full max-w-[1000px] flex items-center justify-center'>
        <button onClick={handlePrev} className='fixed left-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-3 rounded-full z-20 text-3xl'>
          <FaArrowLeft />
        </button>
        <div className='flex flex-row items-center'>
          <div className='relative w-[20vw] h-[20vw] opacity-50 mx-8'>
            <img src={photos[prevIndex]} alt={`Previous Photo`} className='absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg' />
          </div>
          <div className='relative w-[40vw] h-[40vw]'>
            <img src={photos[currentIndex]} alt={`Current Photo`} className='absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg' />
          </div>
          <div className='relative w-[20vw] h-[20vw] opacity-50 mx-8'>
            <img src={photos[nextIndex]} alt={`Next Photo`} className='absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg' />
          </div>
        </div>
        <button onClick={handleNext} className='fixed right-4 top-1/2 transform -translate-y-1/2 text-white bg-black p-3 rounded-full z-20 text-3xl'>
          <FaArrowRight />
        </button>
      </div>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
      `}</style>
    </div>
  );
};

export default Endpoint;








