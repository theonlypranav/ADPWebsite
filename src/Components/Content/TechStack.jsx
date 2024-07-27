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

    const buttonNames = ['Structure', 'Painting', 'Publicity', 'Media'];

    return (
        <div id='OurTeam' style={{ fontFamily: 'Poppins', letterSpacing: 0.5 }} className='bg-custom-light text-black dark:bg-custom-dark dark:text-white p-10 md:p-20 flex flex-col items-center justify-center w-full min-h-screen overflow-hidden'>
            <style>{`
                .glowing-border {
                    border: 2px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 0 0 15px rgba(255, 255, 255, 0.7), 0 0 25px rgba(255, 255, 255, 0.5), 0 0 35px rgba(255, 255, 255, 0.3);
                }
            `}</style>
            
            <div className="top-transition"></div>

            <h1 data-aos='fade-right' style={{ fontFamily: 'Anton', letterSpacing: 0.8 }} className='text-[32px] sm:text-[40px] md:text-[48px] lg:text-[60px] font-semibold mb-8 leading-normal text-silver-700 uppercase'>
                Our Team
            </h1>
            
            <p data-aos='fade-left' style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }} className='text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] mb-8 leading-normal text-silver-700 mb-20 text-center opacity-0 transition-opacity duration-1000 ease-in-out'>
                Meet the passionate and dedicated members who make up our incredible team.
            </p>

            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-wrap justify-center gap-10 mb-10'>
                    {TechStackList.slice(0, 2).map((tech, index) => (
                        <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
                            <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[300px] md:w-[300px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.image)}>
                                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
                            </div>
                            <h2 style={{ fontFamily: 'Poppins', letterSpacing: 0.6 }} className='text-[20px] sm:text-[26px] md:text-[32px] font-bold mt-4 text-center text-silver-700'>{tech.title}</h2>
                            <h3 style={{ fontFamily: 'Poppins', letterSpacing: 0.6 }} className='text-[18px] sm:text-[22px] md:text-[28px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10'>
                    {TechStackList.slice(2, 10).map((tech, index) => (
                        <div key={index} data-aos={tech.id % 2 === 0 ? 'fade-down' : 'fade-up'} className='flex flex-col items-center'>
                            <div className='text-silver-800 rounded-3xl border-2 border-silver-700 shadow-silver-glow-strong p-0 flex items-center justify-center h-[150px] w-[150px] sm:h-[200px] sm:w-[200px] md:h-[250px] md:w-[250px] cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-silver-glow' onClick={() => handleImageClick(tech.image)}>
                                <img className='h-full w-full object-cover rounded-3xl' src={tech.image} alt="" />
                            </div>
                            <h2 style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }} className='text-[20px] sm:text-[24px] md:text-[26px] font-bold mt-4 text-center text-silver-700'>{tech.title}</h2>
                            <h3 style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }} className='text-[16px] sm:text-[18px] md:text-[20px] font-medium text-center text-silver-500'>{tech.subtitle}</h3>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10'>
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

            {selectedImage && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='relative bg-black rounded-xl overflow-hidden' style={{ width: '80%', height: '80%' }}>
                        <button onClick={handleCloseModal} className='absolute top-4 right-4 text-white text-3xl font-bold hover:text-silver-500'>
                            &times;
                        </button>
                        <img className='w-full h-full object-cover' src={selectedImage} alt="Expanded view" />
                    </div>
                </div>
            )}
            
            {selectedItem && (
                <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'>
                    <div className='relative bg-black rounded-xl overflow-hidden w-[80vw] h-[80vh] glowing-border'>
                        <button 
                            onClick={handleCloseModal} 
                            className='absolute top-1 right-1 text-white text-3xl font-bold hover:text-silver-500 p-1'>
                            &times;
                        </button>
                        <div className='flex flex-col md:flex-row h-full custom-bg'>
                            <div className='w-full md:w-1/2 h-1/2 md:h-full'>
                                <img className='w-full h-full object-cover' src={selectedItem.picture} alt="Item" />
                            </div>
                            <div className='w-full md:w-1/2 p-4 max-h-full overflow-y-auto'>
                                <h2 style={{ fontFamily: 'Anton', letterSpacing: 0.8 }} className='text-5xl font-bold text-white mb-3'>{selectedItem.title}</h2>
                                <p style={{ fontFamily: 'Poppins', letterSpacing: 0.8 }} className='text-white mb-4'>{selectedItem.description}</p>
                                <ul className='list-disc list-inside text-white grid grid-cols-2 gap-4'>
                                    {selectedItem.list.map((name, index) => (
                                        <li key={index}>{name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="bottom-transition"></div>
        </div>
    );
}

export default TechStack;