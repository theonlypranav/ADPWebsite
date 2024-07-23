import React from 'react';
import { useNavigate } from 'react-router-dom';

const Slideshow = () => {
  const navigate = useNavigate();

  const handleSlideshow = () => {
    navigate('/slideshow');
  };

  return (
    <div className="slideshow">
      <h1>Slideshow Page</h1>
      <button 
        className='absolute top-4 right-4 bg-silver-700 text-white py-2 px-4 rounded hover:bg-silver-500 transition duration-300'
        onClick={handleSlideshow}
      >
        Slideshow
      </button>
    </div>
  );
};

export default Slideshow;

