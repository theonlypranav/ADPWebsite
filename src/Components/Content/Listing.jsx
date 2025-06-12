import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { HiOutlineDownload, HiOutlineArrowsExpand } from 'react-icons/hi';
import img from '../../assets/panel.jpeg';
import img2 from '../../assets/snap24.jpeg';

const galleryItems = [
  {
    id: 'Siya Bansal - 2023A1PS0171P +916239610198',
    image: img,
    name: '"Gwen" from Spider-Man',
    price: 1500,
    subtitle: 'Contact @ +91 6239 610 198',
    description: 'The grand event showcasing innovation and technology in 2025.',
  },
  {
    id: 'P002 +919123456789',
    image: img2,
    name: 'Oasis 2024',
    price: 199.99,
    subtitle: 'Fun and energy',
    description: 'Capturing moments full of joy and enthusiasm.',
  },
  {
    id: 'P003 +919876543210',
    image: 'https://via.placeholder.com/400x300.png?text=Image+3',
    name: 'Moment 3',
    price: 149.99,
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

  const handleBackClick = () => navigate(-1);

  const openFullscreen = (item) => {
    setFullscreenItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenItem(null);
    document.body.style.overflow = 'unset';
  };

  const extractPhoneNumber = (text) => {
    const match = text.match(/(\+91\s*\d{10})|(\+91\d{10})|(\d{10})/);
    return match ? match[0].replace(/\D/g, '') : null;
  };

  return (
    <div
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center min-h-screen"
    >
      <div className="flex items-center mb-12 justify-between w-full max-w-7xl">
        <div onClick={handleBackClick} className="cursor-pointer">
          <FaArrowLeft className="text-silver-700 hover:text-silver-500 transition duration-300" size={32} />
        </div>
        <h1
          style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center flex-grow"
        >
          Best of ADP Listings
        </h1>
        <div className="w-8" />
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-10 max-w-7xl w-full">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="backdrop-blur-md bg-white/10 dark:bg-white/10 border border-white/20 dark:border-white/20 rounded-2xl shadow-lg p-4 flex flex-col cursor-pointer hover:shadow-xl transition h-[420px]"
          >
            <div className="relative rounded-lg overflow-hidden h-72">
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
              <h2 className="text-xl font-semibold text-white mb-1">{item.name}</h2>
              <p className="text-sm text-gray-300 mb-1">{item.id}</p>
              <p className="text-lg font-bold text-white mb-2">Rs. {item.price.toFixed(2)}</p>
              <p className="text-gray-300 flex-grow">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {fullscreenItem && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-6"
          onClick={closeFullscreen}
        >
          <div
            className="relative max-w-6xl w-full backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row"
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
                src={fullscreenItem.image}
                alt={fullscreenItem.name}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="md:w-1/2 w-full p-6 text-white flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{fullscreenItem.name}</h2>
                <p className="text-lg mb-1">ID: {fullscreenItem.id}</p>
                <p className="text-xl font-bold mb-2">Rs. {fullscreenItem.price.toFixed(2)}</p>
                <p className="text-base mb-1">{fullscreenItem.subtitle}</p>
                <p className="text-gray-300 mt-2">{fullscreenItem.description}</p>
              </div>

              {/* Contact Now Button */}
              {extractPhoneNumber(fullscreenItem.id) && (
                <a
                  href={`https://wa.me/${extractPhoneNumber(fullscreenItem.id)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-fit bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold self-end transition"
                >
                  Contact Now
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Listing;
