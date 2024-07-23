import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Endpoint = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const imageContext = import.meta.glob('../../assets/fest1/*.{jpg,jpeg,png}');
            const imageModules = await Promise.all(
                Object.values(imageContext).map(importFn => importFn())
            );
            setPhotos(imageModules.map(module => module.default));
        };

        loadImages();

        AOS.init({ duration: 1000 });
    }, []);
    console.log(photos);
    return (
        <div id='slideshow' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center relative'>
            <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-8 leading-normal uppercase text-silver-700 mt-[60px]'>
                Relive the Moments
            </h1>
            <p data-aos='fade-left' className='text-lg mb-8 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
                lo iss pr karo aab kaam bc
            </p>
            <div className='w-full overflow-hidden'>
                <div className='flex flex-row gap-10 animate-scroll'>
                    {photos.map((photo, index) => (
                        <div key={index} className='flex flex-col items-center group'>
                            <div className='relative h-[500px] w-[500px] overflow-hidden rounded-3xl border-2 border-silver-700 group-hover:border-silver-500 transition-all duration-300'>
                                <img src={photo} alt={`Photo ${index + 1}`} className='absolute inset-0 object-cover w-full h-full'/>
                                <div className='absolute inset-0 border-2 border-silver-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-silver-glow'></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    display: flex;
                    width: calc(200% + 10px); /* Adjust width to account for gap */
                    animation: scroll 20s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default Endpoint;


