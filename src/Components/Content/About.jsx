import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import img from '../../assets/Snap.jpeg'

function About() {

  // For animation of the content in a component
  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, [])

  return (
    <div id='About ADP' className='bg-black text-white dark:bg-black dark:text-white lg:px-56 lg:py-0 px-10 py-20 text-center gap-5 lg:text-start flex lg:flex-row flex-col justify-between lg:gap-28 items-center'>
      <img data-aos='fade-down' src={img} width={650} height={290} alt="" className='rounded-[20px] border-1 p-1 border-silver-500 img_glow' />
      <div className='h-full lg:py-40 flex flex-col justify-center lg:items-start items-center'>
        <h1 data-aos='fade-right' className='text-[52px] font-semibold mb-8 leading-normal text-silver-700 uppercase'>
          About ADP
        </h1>
        <p data-aos='fade-left'>
          Who are we, you ask? We're the Department of Art, Design and Publicity.
          <br /><br />
          We are responsible for publicising our festivals: Oasis and APOGEE with promotional material, and adorning the campus with massive paintings and breathtaking structures alike.
          <br /><br />
          What we create lives in the memory of thousands of attendees for it gets etched in their memories for years to come. 
          <br /><br />
          Our exploration of different mediums of paintings; physical and digital, sculpting and graphic designing opens up a large avenue for all your budding interests.
        </p>
        <div className='flex mt-8 gap-2 space-x-2 items-center justify-center'>
          <a href="https://forms.gle/UvVKwkFNgcNMZorVA" target="_blank" rel="noopener noreferrer">
            <div className='nano-button shadow-xl hover:shadow-silver-700/50 border-2 hover:bg-silver-700 border-silver-500 rounded-lg py-4 px-8 uppercase overflow-hidden'>
              Apply For Us
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default About
