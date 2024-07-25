import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import light from '../../assets/light.png';
import dark from '../../assets/dark.png';
import logo from '../../assets/ADPLogoNewGrad.png';
import { FaTimes } from 'react-icons/fa';
import { CiMenuFries } from 'react-icons/ci';

function Navbar() {
    const [click, setClick] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const location = useLocation();

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

    useEffect(() => {
        // Scroll to the section if present in the state
        const scrollToSection = location.state?.scrollTo;
        if (scrollToSection) {
            document.getElementById(scrollToSection)?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location.state]);

    const handleClick = () => setClick(!click);

    const navItems = ['Home', 'About ADP', 'Our Projects', 'Our Team'];
    const verticals = ['Media', 'Structure', 'Publicity', 'Painting'];

    const content = (
        <>
            <div className='lg:hidden block absolute top-16 w-full left-0 right-0 bg-black text-white transition'>
                <ul className='text-center text-sm p-20'>
                    {navItems.map((item, index) => (
                        <ScrollLink
                            key={index}
                            to={item}
                            spy={true}
                            smooth={true}
                            offset={-70} // Adjust based on your navbar height
                            onClick={() => setClick(false)} // Close the mobile menu on click
                        >
                            <li className='my-4 py-4 border-b-0 hover:border-b-2 hover:border-silver-700 hover:bg-silver-700 hover:rounded whitespace-nowrap'>
                                {item}
                            </li>
                        </ScrollLink>
                    ))}
                    {/* <li className='my-4 py-4 border-b-0 hover:border-b-2 hover:border-silver-700 hover:bg-silver-700 hover:rounded cursor-pointer whitespace-nowrap'>
                        Our Verticals
                        <ul className='mt-2'>
                            {verticals.map((vertical, index) => (
                                <li key={index} className='py-2 hover:bg-silver-700 hover:text-black whitespace-nowrap'>{vertical}</li>
                            ))}
                        </ul>
                    </li> */}
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

    const isHomePage = location.pathname === '/';

    return (
        <>
            <nav className='fixed top-0 left-0 right-0 bg-black text-white z-50 opacity-100'>
                <div className='h-16 flex justify-between items-center lg:py-5 pl-20 pr-14 py-4 border-b border-silver-500'>
                    <div className='flex items-center flex-1'>
                        <span className='text-3xl font-bold flex items-center'>
                            <RouterLink to='/'><img src={logo} alt="Logo" className='h-8 w-8 mr-2' /></RouterLink>
                        </span>
                    </div>
                    <div className='lg:flex md:flex flex-1 items-center justify-end font-normal hidden'>
                        <ul className='flex gap-8 text-sm items-center'>
                            {navItems.map((item, index) => (
                                isHomePage ? (
                                    <ScrollLink
                                        key={index}
                                        to={item}
                                        spy={true}
                                        smooth={true}
                                        offset={-70} // Adjust based on your navbar height
                                    >
                                        <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                                            {item}
                                        </li>
                                    </ScrollLink>
                                ) : (
                                    <RouterLink
                                        key={index}
                                        to='/'
                                        state={{ scrollTo: item }}
                                    >
                                        <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                                            {item}
                                        </li>
                                    </RouterLink>
                                )
                            ))}
                            {/* <div className='relative group'>
                                <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                                    Our Verticals
                                </li>
                                <ul className='absolute left-0 mt-2 w-40 bg-black border border-silver-500 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity'>
                                    {verticals.map((vertical, index) => (
                                        <li key={index} className='py-2 px-4 hover:bg-silver-500 hover:text-black whitespace-nowrap'>{vertical}</li>
                                    ))}
                                </ul>
                            </div> */}
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
            <div style={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your navbar */}
                {/* Your main content goes here */}
            </div>
        </>
    );
}

export default Navbar;
