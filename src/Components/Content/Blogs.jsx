import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import A25 from '../../assets/front.jpeg';
import O24 from '../../assets/fron24.jpeg';
import A24 from '../../assets/apo24.jpeg';

const blogPosts = [
  {
    id: 1,
    images: [A25, O24],
    title: 'APOGEE 25 Structure',
    subtitle: 'Shlok Jaiswal (2022B1A40134P)',
    content: `ADP Structure team made a neat rail model using paper, Fevicol, and some extra welding to strengthen it. It showed good effort and creativity with simple materials. Maybe next time, adding a bit more detail or making it more sturdy could make it even better.`,
  },
  {
    id: 2,
    images: [O24, A25],
    title: 'Oasis 24 Structure',
    subtitle: 'Ayush Jain (2022B3A70551P)',
    content: `Praesent ut ligula non mi varius sagittis. 
              Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.`,
  },
  {
    id: 3,
    images: [A24, A25],
    title: 'APOGEE 24 Structure',
    subtitle: 'Samarth Jaiswal (2021A4PS0245P)',
    content: `Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. 
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
  },
];

const Blogs = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setCarouselIndex(0);
    document.body.style.overflow = 'hidden';

    // Delay to trigger animation
    setTimeout(() => {
      setIsModalVisible(true);
    }, 10);
  };

  const closeModal = () => {
    setIsModalVisible(false);

    setTimeout(() => {
      setSelectedPost(null);
      document.body.style.overflow = 'unset';
    }, 300); // match transition duration
  };

  const onOverlayClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      closeModal();
    }
  };

  const prevImage = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? selectedPost.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCarouselIndex((prev) =>
      prev === selectedPost.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      id="blogs"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white pt-12 sm:pt-14 md:pt-16 lg:pt-20 pb-10 px-4 sm:px-6 md:px-10 lg:px-20 flex flex-col items-center justify-start relative min-h-screen overflow-hidden"
    >
      <div className="flex items-center mb-12 justify-between w-full max-w-[1200px]">
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
          Coord's Blogs
        </h1>
        <div className="w-8" /> {/* Spacer */}
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4 mt-10 max-w-[1200px] w-full">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => openModal(post)}
            className="relative rounded-xl border border-silver-700 shadow-silver-glow-strong bg-black text-white p-0 flex flex-col cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow"
            style={{ minHeight: '320px' }}
          >
            <img
              src={post.images[0]}
              alt={post.title}
              className="h-60 w-full object-cover rounded-t-xl"
            />
            <div className="px-4 pt-3 pb-2 flex flex-col bg-black text-white rounded-b-xl">
              <h2
                style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
                className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-semibold text-silver-700 mb-1"
              >
                {post.title}
              </h2>
              <p
                style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
                className="text-xs sm:text-sm md:text-base lg:text-lg text-silver-500"
              >
                {post.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedPost && (
        <div
          id="modalOverlay"
          onClick={onOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-6"
        >
          <div
            className={`bg-custom-light dark:bg-custom-dark rounded-2xl w-full max-w-[520px] max-h-[85vh] overflow-y-auto relative p-8 shadow-lg text-black dark:text-white border border-gray-300 dark:border-gray-600
              transform transition-all duration-300
              ${isModalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
            style={{ transitionTimingFunction: 'ease-out' }}
          >
            {/* Image + Close button container with 3:2 aspect ratio and size limits */}
            <div
              className="relative w-full max-w-[480px] max-h-[320px] mb-6 select-none rounded-xl overflow-hidden mx-auto"
              style={{ paddingTop: '66.66%' }} // 3:2 aspect ratio
            >
              <img
                src={selectedPost.images[carouselIndex]}
                alt={`${selectedPost.title} slide ${carouselIndex + 1}`}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />

              {/* Close button in front of the image */}
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-silver-700 hover:text-silver-400 transition text-3xl bg-black bg-opacity-50 rounded-full p-1 z-50"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>

              {selectedPost.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    aria-label="Previous Image"
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    aria-label="Next Image"
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2 text-white hover:bg-opacity-75 transition"
                  >
                    <FaChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <h2
              style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
              className="text-4xl font-bold text-silver-700 mb-2"
            >
              {selectedPost.title}
            </h2>

            <p
              style={{ fontFamily: 'Poppins', letterSpacing: 0.5 }}
              className="text-base sm:text-lg text-silver-500 mb-6"
            >
              {selectedPost.subtitle}
            </p>

            <p
              style={{ fontFamily: 'Poppins', letterSpacing: 0.4 }}
              className="text-[15px] sm:text-base leading-relaxed text-white/90 whitespace-pre-line"
            >
              {selectedPost.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
