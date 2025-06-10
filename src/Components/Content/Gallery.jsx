import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; 
import { HiOutlineDownload } from 'react-icons/hi';

const galleryImages = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x300.png?text=Image+1',
    title: 'Moment 1',
    subtitle: 'A snapshot of joy',
    link: '#'
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x300.png?text=Image+2',
    title: 'Moment 2',
    subtitle: 'Fun and energy',
    link: '#'
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300.png?text=Image+3',
    title: 'Moment 3',
    subtitle: 'Team spirit',
    link: '#'
  }
];

const Gallery = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div
      id="gallery"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white p-4 sm:p-6 md:p-10 lg:p-20 flex flex-col items-center justify-center relative min-h-screen overflow-hidden"
    >
      <div className="flex items-center mb-12 justify-between w-full">
        <div onClick={handleBackClick} className="cursor-pointer">
          <FaArrowLeft className="text-silver-700 hover:text-silver-500 transition duration-300" size={32} />
        </div>
        <h1
          style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center flex-grow"
        >
          Past Snaps
        </h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-24 gap-y-6 mt-10">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            data-aos={img.id % 2 === 0 ? 'fade-down' : 'fade-up'}
            className="flex flex-col items-center"
          >
            <div className="relative rounded-2xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-48 w-64 sm:w-72 md:w-80 lg:w-96 transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow overflow-hidden">
              <img
                className="h-full w-full object-cover rounded-2xl"
                src={img.image}
                alt={img.title}
              />

              {/* Download button */}
              <a
                href={img.image}
                download
                className="absolute top-2 right-2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition z-10"
                title="Download"
                onClick={e => e.stopPropagation()} // prevent click bubbling if you want
              >
                <HiOutlineDownload className="text-white" size={20} />
              </a>
            </div>

            <h2
              style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
              className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-semibold mt-4 mb-0 text-center text-silver-700"
            >
              {img.title}
            </h2>
            <p
              style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl font-regular text-center text-silver-500 mb-5"
            >
              {img.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
