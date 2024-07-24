import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Endpoint = () => {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [enlargedPhoto, setEnlargedPhoto] = useState(null);

  useEffect(() => {
    const loadImages = async () => {
      const imageContext = import.meta.glob('../../assets/fest1/*.{jpg,jpeg,png}');
      const imageModules = await Promise.all(
        Object.values(imageContext).map(importFn => importFn())
      );
      setPhotos(imageModules.map(module => module.default));
    };

    loadImages();

    AOS.init({ duration: 1000 });

    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setEnlargedPhoto(photos[index % photos.length]);
  };

  return (
    <div id='slideshow' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative'>
      <h1 data-aos='fade-right' style={{ fontFamily: 'Anton', letterSpacing: '0.7px' }} className='text-[60px] font-normal mb-8 leading-normal uppercase text-silver-700 mt-[60px] font-anton'>
        RELIVE THE MEMORIES
      </h1>
      <div className='w-full overflow-x-auto py-10'>
        <div className='flex flex-row gap-5'>
          {Array(10).fill(0).map((_, index) => (
            <div key={index} className='flex flex-col items-center p-8'>
              <div
                className={`relative h-[510px] w-[510px] overflow-hidden rounded-3xl border-2 border-silver-700 group-hover:border-silver-500 transition-all duration-300 ${
                  index === currentIndex ? 'active' : ''
                }`}
                onClick={() => handleImageClick(index)}
              >
                <img src={photos[index % photos.length]} alt={`Photo ${index + 1}`} className='absolute inset-0 object-cover w-full h-full'/>
              </div>
              {index === currentIndex && (
                <p className='text-lg text-white font-semibold'>{`Photo ${index + 1} - Description`}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      {enlargedPhoto && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10' onClick={() => setEnlargedPhoto(null)}>
          <div className='bg-white p-8 rounded-lg' style={{ maxWidth: '50%' }}>
            <img src={enlargedPhoto} alt='Enlarged Photo' className='w-full mb-4 rounded-lg'/>
            <p className='text-lg text-gray-700'>{`Photo ${currentIndex + 1} - Description`}</p>
          </div>
        </div>
      )}
      <style jsx>{`
       .active {
          z-index: 1;
          transform: scale(1.1);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }

       .flex-row {
          overflow-x: auto;
          scrollbar-width: none;
        }

       .flex-row::-webkit-scrollbar {
          display: none;
        }

        @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
      `}</style>
    </div>
  );
};

export default Endpoint;
