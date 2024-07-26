import React, { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import img from '../../assets/ADPLogoNewGrad_Transparent.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const scrollToSection = location.state?.scrollTo;
    if (scrollToSection) {
      document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.state]);

  const social = [
    {
      link: 'https://www.linkedin.com/company/department-of-art-design-and-publicity-bits-pilani/',
      icon: <FaLinkedinIn className="icon-glow text-silver-700 hover:text-silver-500" />,
    },
    {
      link: 'https://www.instagram.com/adp_bitspilani/',
      icon: <FaInstagram className="icon-glow text-silver-700 hover:text-silver-500" />,
    },
    {
      link: 'http://wasap.my/918000695988',
      icon: <FaWhatsapp className="icon-glow text-silver-700 hover:text-silver-500" />,
    },
  ];

  return (
    <div id='Home' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-56 lg:py-0 px-10 py-20 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between lg:gap-28 items-center min-h-screen overflow-hidden'>
      <div className='h-full lg:py-40 flex flex-col justify-center lg:items-start items-center'>
        <h1 data-aos='fade-right' style={{ fontFamily: 'Anton', letterSpacing: 0.8 }} className='text-[14px] sm:text-[18px] md:text-[24px] lg:text-[30px] font-bold mb-8 leading-normal uppercase'>
          Welcome To The Department of<br /><span className='text-[32px] sm:text-[40px] md:text-[56px] lg:text-[72px] font-bold mb-8 leading-normal uppercase text-silver-700'> Art, Design and Publicity</span>
        </h1>
        <p data-aos='fade-left' style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }} className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]  mb-8 leading-normal text-silver-700'>
          A collective of passionate artists, we are the visionaries behind the stunning aesthetics of Oasis and APOGEE, the grand cultural and technical fest of BITS Pilani. From breathtaking backdrops to mind-blowing structures, we craft the ambiance that defines these iconic festivals. We are the architects of the visual narrative, infusing every corner with creativity and innovation. Beyond the artistic realm, we are the driving force behind the publicity of these flagship events. Our canvas is the stage, and our colors are imagination. We create more than just visuals; we craft experiences.
        </p>
        <div data-aos='fade-up' className='flex mt-8 gap-2'>
          <div className='flex items-center justify-center'>
            <div className='flex space-x-2'>
              {social.map((social, index) => (
                <a key={index} target="_blank" href={social.link} className='hover:text-silver-500 rounded-full p-2'>
                  <div className='text-[20px] sm:text-[24px] md:text-[28px]'>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img data-aos='fade-up' src={img} alt="ADP Logo" className='rounded-full border-2 p-1 border-silver-700 img_glow w-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]' />
    </div>
  );
}

export default Home;
