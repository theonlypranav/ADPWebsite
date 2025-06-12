import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { HiOutlineDownload, HiOutlineArrowsExpand } from 'react-icons/hi';
import img from '../../assets/panel.jpeg';
import img2 from '../../assets/snap24.jpeg';

const galleryItems = [
  {
    id: 'Siya Bansal - 2023A1PS0171P',
    image: img,
    name: '"Gwen" from Spider-Man',
    price: 1500,
    subtitle: 'Contact @ +91 6239 610 198',
    description: 'The grand event showcasing innovation and technology in 2025.',
  },
  {
    id: 'P002',
    image: img2,
    name: 'Oasis 2024',
    price: 199.99,
    subtitle: 'Fun and energy',
    description: 'Capturing moments full of joy and enthusiasm.',
  },
  {
    id: 'P003',
    image: 'https://via.placeholder.com/400x300.png?text=Image+3',
    name: 'Moment 3',
    price: 149.99,
    subtitle: 'Team spirit',
    description: 'Celebrating unity and collaboration among teams.',
  },
  {
    id: 'P004',
    image: 'https://via.placeholder.com/400x300.png?text=Image+4',
    name: 'Moment 4',
    price: 179.99,
    subtitle: 'Team spirit',
    description: 'Celebrating unity and collaboration among teams.',
  },
];

const Listing = () => {
  const navigate = useNavigate();
  const [fullscreenItem, setFullscreenItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openFullscreen = (item) => {
    setFullscreenItem(item);
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeFullscreen = () => {
    setFullscreenItem(null);
    document.body.style.overflow = 'unset'; // restore scroll
  };

  return (
    <div
      id="listing"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-start relative min-h-screen overflow-hidden"
    >
      <div className="flex items-center mb-12 justify-between w-full max-w-7xl">
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
          Best of ADP Listings
        </h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      {/* Card Grid */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10 max-w-7xl w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-2xl border border-silver-700 shadow-lg p-4 flex flex-col cursor-pointer hover:shadow-xl transition"
          >
            <div className="relative rounded-lg overflow-hidden h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
                onClick={() => openFullscreen(item)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openFullscreen(item);
                }}
                title="View Fullscreen"
                className="absolute top-2 left-2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition z-20"
              >
                <HiOutlineArrowsExpand className="text-white" size={20} />
              </button>

              <a
                href={item.image}
                download
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 bg-black bg-opacity-60 p-2 rounded-full hover:bg-opacity-80 transition z-20"
                title="Download"
              >
                <HiOutlineDownload className="text-white" size={20} />
              </a>
            </div>

            <div className="mt-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-silver-700 mb-1">{item.name}</h2>
              <p className="text-sm text-gray-500 mb-2">{item.id}</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white mb-4">Rs. {item.price.toFixed(2)}</p>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Overlay */}
      {fullscreenItem && (
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
              src={fullscreenItem.image}
              alt={fullscreenItem.name}
              className="w-auto max-w-screen h-[80vh] rounded-xl object-cover object-center"
            />
            <div className="mt-4 bg-black bg-opacity-70 rounded-lg p-4 max-w-[90vw] w-full text-center text-white">
              <h2 className="text-3xl font-semibold mb-1">{fullscreenItem.name}</h2>
              <p className="text-lg mb-1">ID: {fullscreenItem.id}</p>
              <p className="text-xl font-bold mb-2">${fullscreenItem.price.toFixed(2)}</p>
              <p className="text-base whitespace-pre-wrap">{fullscreenItem.subtitle}</p>
              <p className="mt-2 text-gray-300">{fullscreenItem.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
