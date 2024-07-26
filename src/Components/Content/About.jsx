import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from 'react-modal';
import img from '../../assets/snap2.jpeg';

Modal.setAppElement('#root');

function About() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = img;
    link.download = 'image.jpg';
    link.target = '_blank';
    link.click();
  };

  return (
    <div id='About ADP' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-32 px-5 py-20 text-center gap-5 lg:text-start flex lg:flex-row flex-col justify-between lg:gap-20 items-center min-h-screen overflow-hidden'>
      <img
        data-aos='fade-down'
        src={img}
        alt="ADP Image"
        className='rounded-[20px] border-1 p-1 border-silver-500 img_glow cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:border-silver-300 w-full max-w-[400px] lg:max-w-[650px] h-auto'
        onClick={openModal}
      />
      <div className='h-full lg:py-20 flex flex-col justify-center lg:items-start items-center'>
        <h1 data-aos='fade-right' className='text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-semibold mb-8 leading-normal text-silver-700 uppercase'>
          About ADP
        </h1>
        <p data-aos='fade-left' className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed text-silver-700 max-w-[500px] lg:max-w-none'>
          Who are we, you ask? We're the Department of Art, Design and Publicity.
          <br /><br />
          We are responsible for publicising our festivals: Oasis and APOGEE with promotional material, and adorning the campus with massive paintings and breathtaking structures alike.
          <br /><br />
          What we create lives in the memory of thousands of attendees for it gets etched in their memories for years to come. 
          <br /><br />
          Our exploration of different mediums of paintings; physical and digital, sculpting and graphic designing opens up a large avenue for all your budding interests.
        </p>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className='flex justify-center items-center'
        overlayClassName='fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center'
      >
        <div className='relative bg-white dark:bg-custom-dark rounded-lg shadow-lg p-4 w-full max-w-[90%] max-h-[90%] flex flex-col items-center'>
          <div className='flex justify-between mb-4 w-full'>
            <button onClick={closeModal} className='text-black dark:text-white bg-silver-700 hover:bg-silver-500 text-sm px-4 py-2 rounded'>
              Close
            </button>
            <button onClick={downloadImage} className='text-black dark:text-white bg-silver-700 hover:bg-silver-500 text-sm px-4 py-2 rounded'>
              Download
            </button>
          </div>
          <img src={img} alt="Enlarged" className='max-w-full max-h-full object-contain rounded-lg' />
        </div>
      </Modal>
    </div>
  );
}

export default About;
