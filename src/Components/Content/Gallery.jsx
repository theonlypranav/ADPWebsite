import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
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
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => navigate(-1);

  const openFullscreen = (img) => {
    setFullscreenImg(img);
    setTimeout(() => setModalVisible(true), 50);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setModalVisible(false);
    setTimeout(() => {
      setFullscreenImg(null);
      document.body.style.overflow = 'unset';
    }, 300);
  };

  return (
    <div
      id="gallery"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-start min-h-screen"
    >
      {/* Header */}
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
        <div className="w-8" />
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
        {galleryImages.map((img) => (
          <div
            key={img.id}
            onClick={() => openFullscreen(img)}
            className="cursor-pointer group bg-white/5 dark:bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src={img.image}
                alt={img.title}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />

              {/* Expand Icon */}
              <div className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 p-2 rounded-full z-10">
                <HiOutlineArrowsExpand className="text-white" size={20} />
              </div>

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

            {/* Text Content */}
            <div className="p-4 text-white">
              <h2 className="text-xl font-semibold mb-1 tracking-wide text-white">{img.title}</h2>
              <p className="text-sm text-gray-300 mb-1">{img.subtitle}</p>
              <p className="text-sm text-gray-400">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenImg && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 p-6 transition-all duration-300 bg-black ${
            modalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          onClick={closeFullscreen}
        >
          <div
            className="relative max-w-6xl w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 text-white text-xl p-2 bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition z-50"
              aria-label="Close fullscreen"
            >
              ✖
            </button>

            <div className="md:w-1/2 w-full h-[300px] md:h-auto">
              <img
                src={fullscreenImg.image}
                alt={fullscreenImg.title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="md:w-1/2 w-full p-6 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{fullscreenImg.title}</h2>
                <p className="text-base text-gray-300 mb-1">{fullscreenImg.subtitle}</p>
                <p className="text-base text-gray-400 mt-2">{fullscreenImg.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
