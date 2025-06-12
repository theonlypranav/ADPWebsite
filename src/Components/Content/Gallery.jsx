import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { HiOutlineDownload, HiOutlineArrowsExpand } from 'react-icons/hi';
import img from '../../assets/snap3.jpeg';
import img2 from '../../assets/snap24.jpeg';

const galleryImages = [
  {
    id: 1,
    image: img,
    title: 'APOGEE 2025',
    subtitle: 'Batches: 2021-2024',
    description: 'The grand event showcasing innovation and technology in 2025.',
    link: '#',
  },
  {
    id: 2,
    image: img2,
    title: 'Oasis 2024',
    subtitle: 'Fun and energy',
    description: 'Capturing moments full of joy and enthusiasm.',
    link: '#',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300.png?text=Image+3',
    title: 'Moment 3',
    subtitle: 'Team spirit',
    description: 'Celebrating unity and collaboration among teams.',
    link: '#',
  },
  {
    id: 4,
    image: 'https://via.placeholder.com/400x300.png?text=Image+4',
    title: 'Flashback',
    subtitle: 'Legacy and Vibes',
    description: 'A tribute to the unforgettable legacy of past editions.',
    link: '#',
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [fullscreenImg, setFullscreenImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openFullscreen = (img) => {
    setFullscreenImg(img);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenImg(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <div
      id="gallery"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-start min-h-screen"
    >
      {/* Header */}
      <div className="flex items-center mb-12 justify-between w-full">
        <div onClick={handleBackClick} className="cursor-pointer">
          <FaArrowLeft
            className="text-silver-700 hover:text-silver-500 transition duration-300"
            size={32}
          />
        </div>
        <h1
          style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center flex-grow"
        >
          Past Snaps
        </h1>
        <div className="w-8" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            className="bg-black/40 dark:bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative h-64 w-full">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Fullscreen Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreen(img);
                }}
                title="Fullscreen"
                className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 p-2 rounded-full z-10"
              >
                <HiOutlineArrowsExpand className="text-white" size={20} />
              </button>

              {/* Download Button */}
              <a
                href={img.image}
                download
                onClick={(e) => e.stopPropagation()}
                title="Download"
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 p-2 rounded-full z-10"
              >
                <HiOutlineDownload className="text-white" size={20} />
              </a>
            </div>

            {/* Info Box */}
            <div className="p-4 text-white">
              <h2 className="text-lg font-semibold mb-1 tracking-wide">{img.title}</h2>
              <p className="text-sm text-gray-300 mb-1">{img.subtitle}</p>
              <p className="text-sm text-gray-400">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {fullscreenImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-6"
          onClick={closeFullscreen}
        >
          <div
            className="relative max-w-full max-h-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white text-3xl p-2 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 transition z-50"
              aria-label="Close fullscreen"
            >
              <FaTimes />
            </button>
            <img
              src={fullscreenImg.image}
              alt={fullscreenImg.title}
              className="w-auto max-w-screen h-[80vh] rounded-xl object-cover object-center"
            />
            <div className="mt-4 bg-black bg-opacity-70 rounded-lg p-4 max-w-[90vw] w-full text-center">
              <h2 className="text-3xl font-semibold text-white mb-1">
                {fullscreenImg.title}
              </h2>
              <p className="text-lg text-silver-300 mb-2">{fullscreenImg.subtitle}</p>
              <p className="text-base text-gray-300 whitespace-pre-wrap">{fullscreenImg.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
