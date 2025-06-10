import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Modal from 'react-modal';
import img from '../../assets/snap3.jpeg';
import './Home.css';

Modal.setAppElement('#root');

function Aftermovie() {
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
    <div
      id='Aftermovie'  // <--- Changed this from 'AboutUs' to 'Aftermovie'
      className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-16 px-5 py-20 text-center gap-5 lg:text-start flex lg:flex-row flex-col justify-between lg:gap-20 items-center min-h-screen overflow-hidden'
    >
      <div className="top-transition"></div>

      {/* Text side: limit max width */}
      <div className='h-full lg:py-20 flex flex-col justify-center lg:items-start items-center lg:w-1/3 w-full'>
        <h1
          data-aos='fade-right'
          style={{ fontFamily: 'Anton', letterSpacing: 0.8 }}
          className='text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-semibold mb-8 leading-normal text-silver-700 uppercase'
        >
          The ADP Aftermovie
        </h1>
        <p
          data-aos='fade-left'
          style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }}
          className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] mb-8 leading-normal text-silver-700 max-w-[500px] lg:max-w-none'
        >
          Who are we, you ask? We're the Department of Art, Design and Publicity.
          <br />
          <br />
          We are responsible for publicising our festivals: Oasis and APOGEE with promotional
          material, and adorning the campus with massive paintings and breathtaking structures alike.
        </p>
      </div>

      {/* Video side: take more width */}
      <div
        data-aos="fade-down"
        className="border-1 p-1 border-silver-500 img_glow transition-transform duration-300 transform hover:scale-105 hover:border-silver-300 lg:w-2/3 w-full aspect-video max-w-[1400px]"
      >
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/afwJHPNoPuk"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="bottom-transition"></div>
    </div>
  );
}

export default Aftermovie;


