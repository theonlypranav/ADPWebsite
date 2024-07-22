import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram } from 'react-icons/fa';

function Footer() {

    const social = [
        {
            link: 'https://www.linkedin.com/in/chirag-jain-77aa30148',
            icon: <FaLinkedinIn className="text-silver-700 hover:text-silver-500" />,
        },
        {
            link: 'https://github.com/chiragjain307',
            icon: <AiFillGithub className="text-silver-700 hover:text-silver-500" />,
        },
        {
            link: 'https://twitter.com/mr_kasliwal',
            icon: <FaXTwitter className="text-silver-700 hover:text-silver-500" />,
        },
        {
            link: 'https://www.instagram.com/_mr_kasliwal_',
            icon: <FaInstagram className="text-silver-700 hover:text-silver-500" />,
        }
    ];

    return (
        <footer className='bg-gray-800 text-white border-t border-silver-700 p-5 lg:px-48 md:flex justify-between'>
            <div>
                <h2 className='text-[22px] font-semibold text-silver-700 py-2'>Copyright © 2024. All rights are reserved</h2>
            </div>
            <div className='md:flex lg:flex gap-10'>
                <div>
                    <h2 className='text-[22px] font-semibold text-silver-700 py-2 uppercase'>Contact</h2>
                    <a href="mailto:chiragjain.jain7@gmail.com" className='text-[16px] hover:text-silver-700 transition-all duration-150 ease-in-out cursor-pointer'>Email: chiragjain.jain7@gmail.com</a>
                    <p className='text-[16px] pb-5 hover:text-silver-700 transition-all duration-150 ease-in-out'>Phone: +91-8302421632</p>
                </div>
                <div>
                    <h2 className='text-[22px] font-semibold text-silver-700 py-2 uppercase'>Follow Me</h2>
                    <div className='flex space-x-4'>
                        {social.map((item, index) => (
                            <a key={index} target="_blank" rel="noopener noreferrer" href={item.link} className='hover:text-silver-700 transition-all duration-150 ease-in-out'>
                                <div className='text-[28px]'>
                                    {item.icon}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
