import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
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

  const isHomePage = location.pathname === '/';

  return (
    <>
      <nav className='fixed top-0 left-0 right-0 bg-black text-white z-50'>
        <div className='flex items-center justify-between px-4 py-4 lg:px-20 lg:py-6 border-b border-silver-500'>
          <RouterLink to='/' className='flex items-center'>
            <img src={logo} alt="Logo" className='h-8 w-8 lg:h-12 lg:w-12' />
          </RouterLink>
          <button
            className='block lg:hidden text-2xl'
            onClick={handleClick}
          >
            {click ? <FaTimes /> : <CiMenuFries />}
          </button>
          <div className='hidden lg:flex flex-1 items-center justify-end relative'>
            <ul className='flex gap-8 text-base items-center'>
              {navItems.map((item, index) => (
                isHomePage ? (
                  <ScrollLink
                    key={index}
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-70}
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
              <div className='relative group'>
                <button className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                  Our Legacy
                </button>
                <div className='absolute left-0 mt-2 bg-black text-white border border-silver-500 py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity z-50'>
                  <RouterLink to='/treedesign?param=stuccan'>
                    <li className='p-2 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 cursor-pointer whitespace-nowrap rounded-t-lg'>
                      StuCCAn's
                    </li>
                  </RouterLink>
                  <RouterLink to='/treedesign?param=costaan'>
                    <li className='p-2 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 cursor-pointer whitespace-nowrap rounded-b-lg'>
                      CoStAAn's
                    </li>
                  </RouterLink>
                </div>
              </div>
            </ul>
          </div>
        </div>
        {click && (
          <div className='lg:hidden'>
            <ul className='flex flex-col gap-4 text-base items-center'>
              {navItems.map((item, index) => (
                isHomePage ? (
                  <ScrollLink
                    key={index}
                    to={item}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    onClick={() => setClick(false)}
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
                    onClick={() => setClick(false)}
                  >
                    <li className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                      {item}
                    </li>
                  </RouterLink>
                )
              ))}
              <div className='relative group'>
                <button className='border-b-0 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 transition cursor-pointer whitespace-nowrap'>
                  Our Legacy
                </button>
                <div className='absolute left-0 mt-2 bg-black text-white border border-silver-500 py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity z-50'>
                  <RouterLink to='/treedesign?param=stuccan'>
                    <li className='p-2 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 cursor-pointer whitespace-nowrap rounded-t-lg'>
                      StuCCAn's
                    </li>
                  </RouterLink>
                  <RouterLink to='/treedesign?param=costaan'>
                    <li className='p-2 hover:border-b-2 hover:border-silver-700 hover:text-silver-700 cursor-pointer whitespace-nowrap rounded-b-lg'>
                      CoStAAn's
                    </li>
                  </RouterLink>
                </div>
              </div>
            </ul>
          </div>
        )}
      </nav>
      <div style={{ paddingTop: '64px' }}>
        {/* Your main content goes here */}
      </div>
    </>
  );
}

export default Navbar;