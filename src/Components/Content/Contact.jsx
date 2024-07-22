import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Contact() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div id='Contact' className='bg-black text-white dark:bg-black dark:text-white p-4 lg:p-20 flex flex-col items-center justify-center'>
      <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-20 leading-normal uppercase text-silver-700'>Contact Us</h1>
      <form action="https://api.web3forms.com/submit" method="POST" className='flex flex-col gap-4 lg:w-1/2'>
        <div className='dark:text-slate-500 lg:flex gap-6'>
          <input type="hidden" name="access_key" value="a3acc553-464c-4fc0-ab60-2ba7b134788f" />
          <input type="text" name="name" className='w-full my-3 rounded-lg p-4 border-2 border-silver-700 bg-black text-white placeholder:text-silver-400' placeholder='Enter Your Full Name' required />
          <input type="email" name="email" className='w-full my-3 rounded-lg p-4 border-2 border-silver-700 bg-black text-white placeholder:text-silver-400' placeholder='Enter Your Email' required />
        </div>
        <textarea name="message" className='w-full my-3 rounded-lg bg-black text-white p-4 border-2 border-silver-700 placeholder:text-silver-400' placeholder='Enter Your Message...' cols="20" rows="10" required></textarea>
        <button
          className='nano-button my-3 shadow-xl hover:shadow-silver-500 text-black dark:text-white border-2 hover:bg-silver-700 border-silver-700 rounded-lg py-4 px-8 uppercase relative overflow-hidden'
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Contact;
