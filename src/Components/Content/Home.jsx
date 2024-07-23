import React, { useEffect } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram,FaWhatsapp } from 'react-icons/fa';
import img from '../../assets/ADPLogoNewGrad.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

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
    <div id='Home' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white lg:px-56 lg:py-0 px-10 py-20 text-center gap-5 lg:text-start flex lg:flex-row flex-col-reverse justify-between lg:gap-28 items-center'>
      <div className='h-full lg:py-40 flex flex-col justify-center lg:items-start items-center'>
        <h1 data-aos='fade-right'style={{ fontFamily: 'Anton' }} className='text-[58px] font-bold mb-8 leading-normal uppercase'>
          Welcome To <span className='text-silver-700'>The Department of Art, Design and Publicity</span>
        </h1>
        <p data-aos='fade-left'>A collective of passionate artists, we are the visionaries behind the stunning aesthetics of Oasis and APOGEE, the grand cultural and technical fest of BITS Pilani . From breathtaking backdrops to mind-blowing structures, we craft the ambiance that defines these iconic festivals . We are the architects of the visual narrative, infusing every corner with creativity and innovation . Beyond the artistic realm, we are the driving force behind the publicity of these flagship events . Our canvas is the stage, and our colors are imagination. We create more than just visuals; we craft experiences.</p>
        <div data-aos='fade-up' className='flex mt-8 gap-2'>
          <div className='flex items-center justify-center'>
            <div className='flex space-x-2'>
              {social.map((social, index) => (
                <a key={index} target="_blank" href={social.link} className='hover:text-silver-500 rounded-full p-2'>
                  <div className='text-[28px]'>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img data-aos='fade-up' src={img} width={500} height={500} alt="" className='rounded-full border-2 p-1 border-silver-700 img_glow' />
    </div>
  );
}

export default Home;
