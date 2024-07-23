import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DevsList from '../../All_Lists/DevsList';

function Developers() {
  const [selectedImage, setSelectedImage] = useState(null);

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleImageClick = (image) => {
    console.log('Image clicked:', image);  // Debugging
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div id='Contact' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center'>
      <h1 data-aos='fade-right' className='text-[72px] font-semibold mb-4 leading-normal uppercase text-silver-700'>The Developers</h1>
      <p data-aos='fade-left' className='text-lg mb-20 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
        Meet the passionate and dedicated developers who make up our incredible team.
      </p>
      
      <div className='flex flex-col items-center'>
        <div className='flex flex-wrap gap-10 justify-center'>
          {DevsList.slice(0, 4).map((tech, index) => (
          {DevsList.slice(0, 5).map((tech, index) => (
            <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
              <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-40 w-40 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.image)}>
                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
              </div>
              <h2 className='text-[24px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
              <h3 className='text-[18px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
          <div className='relative bg-black rounded-xl overflow-hidden' style={{ width: '50vw', height: '50vw' }}>
            <button onClick={handleCloseModal} className='absolute top-4 right-4 text-white text-3xl font-bold hover:text-silver-500'>
              &times;
            </button>
            <img className='w-full h-full object-cover' src={selectedImage} alt="Expanded view" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Developers;
