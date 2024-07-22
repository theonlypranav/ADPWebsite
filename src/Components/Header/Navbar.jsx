import React, { useEffect, useState } from 'react';
import light from '../../assets/light.png';
import dark from '../../assets/dark.png';
import logo from '../../assets/ADPLogoNewGrad.png'; // Import the logo image
import { Link } from 'react-scroll';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';

function Navbar() {
    const [click, setClick] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = (event) => {
        setDarkMode(!darkMode);
        if (event.target.checked) {
            document.documentElement.setAttribute('class', 'dark');
        } else {
            document.documentElement.removeAttribute('class');
        }
    };

    useEffect(() => {
        document.documentElement.setAttribute('class', 'dark');
    }, []);

    const handleClick = () => setClick(!click);
    
    const navItems = ['Home', 'About ADP', 'Our Team', 'Our Projects', 'Contact'];
    const verticals = ['Media', 'Structure', 'Publicity', 'Painting'];

    const content = (
        <>
            <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-black text-white transition'>
                <ul className='text-center text-sm p-20'>
                    {navItems.map((item, index) => (
                        <Link key={index} to={item} spy={true} smooth={true}>
                            <li className='my-4 py-4 border-b-0 hover:border-b-2 hover:border-silver-700 hover:bg-silver-700 hover:rounded whitespace-nowrap'>{item}</li>
                        </Link>
                    ))}
                    <li className='my-4 py-4 border-b-0 hover:border-b-2 hover:border-silver-700 hover:bg-silver-700 hover:rounded cursor-pointer whitespace-nowrap'>
                        Our Verticals
                        <ul className='mt-2'>
                            {verticals.map((vertical, index) => (
                                <li key={index} className='py-2 hover:bg-silver-700 hover:text-black whitespace-nowrap'>{vertical}</li>
                            ))}
                        </ul>
                    </li>
                    <div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                value=""
                                className="sr-only peer"
                                onChange={toggleTheme}
                                checked={darkMode}
                            />
                            <div className="w-[49px] h-6 bg-silver-500 rounded-full border border-gray-400 peer-checked:after:translate-x-6 after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all">
                                <img src={light} alt="light" className="absolute w-4 z-10 m-[4px]" />
                                <img src={dark} alt="dark" className="absolute w-4 z-10 m-[4px] right-0" />
                            </div>
                        </label>
                    </div>
                </ul>
            </div>
        </>
    );

    return (
        <>
            <nav className='sticky top-0 bg-black text-white'>
                <div className='h-10vh flex justify-between z-50 lg:py-5 pl-20 pr-14 py-4 border-b border-silver-500'>
                    <div className='flex items-center flex-1'>
                        <span className='text-3xl font-bold flex items-center'>
                            <Link to='Home' spy={true} smooth={true}><img src={logo} alt="Logo" className='h-8 w-8 mr-2' /></Link>
                        </span>
                    </div>
                    <div className='lg:flex md:flex flex-1 items-center justify-end font-normal hidden'>
                        <ul className='flex gap-8 text-sm'>
                            {navItems.map((item, index) => (
                                <Link key={index} to={item} spy={true} smooth={true}>
                                    <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>{item}</li>
                                </Link>
                            ))}
                            <div className='relative group'>
                                <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                                    Our Verticals
                                </li>
                                <ul className='absolute left-0 mt-2 w-40 bg-black border border-silver-500 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                                    {verticals.map((vertical, index) => (
                                        <li key={index} className='py-2 px-4 hover:bg-silver-500 hover:text-black whitespace-nowrap'>{vertical}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value=""
                                        className="sr-only peer"
                                        onChange={toggleTheme}
                                        checked={darkMode}
                                    />
                                    <div className="w-[49px] h-6 bg-silver-500 rounded-full border border-gray-400 peer-checked:after:translate-x-6 after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all">
                                        <img src={light} alt="light" className="absolute w-4 z-10 m-[4px]" />
                                        <img src={dark} alt="dark" className="absolute w-4 z-10 m-[4px] right-0" />
                                    </div>
                                </label>
                            </div>
                        </ul>
                    </div>
                    <button
                        className='block md:hidden transition text-2xl'
                        onClick={handleClick}>
                        {click ? <FaTimes /> : <CiMenuFries />}
                    </button>
                    <div className='md:hidden'>
                        {click && content}
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
