import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    image: 'https://via.placeholder.com/400x300.png?text=Blog+1',
    title: 'APOGEE 25 Structure',
    subtitle: 'Shlok Jaiswal (2022B1A40134P)',
    content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, 
              vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.`,
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/400x300.png?text=Blog+2',
    title: 'Design Thinking in Modern Projects',
    subtitle: 'How design impacts project success',
    content: `Praesent ut ligula non mi varius sagittis. 
              Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus.`,
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/400x300.png?text=Blog+3',
    title: 'Sustainable Innovations',
    subtitle: 'Building a greener tomorrow',
    content: `Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. 
              Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.`,
  },
];

const Blogs = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const openModal = (post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden'; // prevent background scroll
  };

  const closeModal = () => {
    setSelectedPost(null);
    document.body.style.overflow = 'unset'; // restore scroll
  };

  // Close modal if clicking outside modal content
  const onOverlayClick = (e) => {
    if (e.target.id === 'modalOverlay') {
      closeModal();
    }
  };

  return (
    <div
      id="blogs"
      className="bg-custom-light text-black dark:bg-custom-dark dark:text-white p-4 sm:p-6 md:p-10 lg:p-20 flex flex-col items-center justify-center relative min-h-screen overflow-hidden"
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

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-24 gap-y-6 mt-10 max-w-[1200px] w-full">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => openModal(post)}
            className="relative rounded-2xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex flex-col cursor-pointer overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow"
            style={{ minHeight: '320px' }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover rounded-t-2xl"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2
                style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
                className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] font-semibold text-silver-700 mb-2"
              >
                {post.title}
              </h2>
              <p
                style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
                className="text-sm sm:text-base md:text-lg lg:text-xl font-regular text-silver-500 flex-grow"
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
          <div className="bg-custom-light dark:bg-custom-dark rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative p-8 shadow-lg text-black dark:text-white">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-silver-700 hover:text-silver-400 transition text-3xl"
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="rounded-2xl w-full h-64 object-cover mb-6"
            />
            <h2
              style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
              className="text-4xl font-bold mb-4 text-silver-700"
            >
              {selectedPost.title}
            </h2>
            <p
              style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
              className="text-lg leading-relaxed whitespace-pre-line"
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
