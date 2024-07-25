import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import TechStackList from '../../All_Lists/TechStackList';
import TeamList from '../../All_Lists/TeamList';

function TechStack() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    useEffect(() => {
        if (selectedItem || selectedImage) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [selectedItem, selectedImage]);

    const handleImageClick = (image) => {
        setSelectedImage(image);
    };

    const handleButtonClick = (itemKey) => {
        setSelectedItem(TeamList[itemKey]);
    };

    const handleCloseModal = () => {
        setSelectedItem(null);
        setSelectedImage(null);
    };

    // Button names (customizable)
    const buttonNames = ['Structure', 'Painting', 'Publicity', 'Media'];

    return (
        <div id='Our Team' className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-20 flex flex-col items-center justify-center'>
            <h1 data-aos='fade-right' className='text-[72px] font-semibold mb-4 leading-normal uppercase text-silver-700'>Our Team</h1>
            <p data-aos='fade-left' className='text-lg mb-20 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
                Meet the passionate and dedicated members who make up our incredible team.
            </p>

            <div className='flex flex-col items-center'>
                <div className='flex flex-row gap-28 mb-10'>
                    {TechStackList.slice(0, 2).map((tech, index) => (
                        <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
                            <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-56 w-56 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.image)}>
                                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
                            </div>
                            <h2 className='text-[32px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
                            <h3 className='text-[28px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
                        </div>
                    ))}
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10 mb-10'>
                    {TechStackList.slice(2, 10).map((tech, index) => (
                        <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
                            <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-36 w-36 cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.image)}>
                                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
                            </div>
                            <h2 className='text-[26px] font-semibold mt-4 text-center text-silver-700'>{tech.title}</h2>
                            <h3 className='text-[20px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
                        </div>
                    ))}
                </div>

                <div className='grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-20 mb-10'>
                    {buttonNames.map((name, index) => (
                        <div key={index} className='flex flex-col items-center' data-aos='fade-up' data-aos-delay={`${index * 100}`}>
                            <button
                                className='bg-dark-custom text-white border border-light-custom p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-custom-light-glow font-bold'
                                style={{ width: '12rem', fontSize: '16px', boxShadow: '0 4px 8px rgba(255, 255, 255, 0.5)' }}
                                onClick={() => handleButtonClick(index)}
                            >
                                {name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal for images */}
            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='relative bg-black rounded-xl overflow-hidden' style={{ width: '45vw', height: '45vw' }}>
                        <button onClick={handleCloseModal} className='absolute top-4 right-4 text-white text-2xl font-bold hover:text-silver-500'>
                            &times;
                        </button>
                        <img className='w-full h-full object-cover' src={selectedImage} alt="Expanded view" />
                    </div>
                </div>
            )}

            {selectedItem && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='relative bg-black rounded-xl overflow-hidden w-full max-w-4xl h-auto max-h-4xl m-4'>
                        <button onClick={handleCloseModal} className='absolute top-4 right-4 text-white text-2xl font-bold hover:text-silver-500'>
                            &times;
                        </button>
                        <div className='flex flex-col md:flex-row h-full'>
                            <div className='w-full md:w-1/2 h-64 md:h-auto'>
                                <img className='w-full h-full object-cover' src={selectedItem.picture} alt="Item" />
                            </div>
                            <div className='w-full md:w-1/2 p-4 overflow-y-auto'>
                                <h2 className='text-3xl font-bold text-white mb-2'>{selectedItem.title}</h2>
                                <p className='text-white mb-4'>{selectedItem.description}</p>
                                <ul className='list-disc list-inside text-white'>
                                    {selectedItem.list.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TechStack;



