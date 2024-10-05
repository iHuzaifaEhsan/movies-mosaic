import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {

  const handleRedirect = () => {
    window.open('https://huzaifaehsan.netlify.app/', '_blank'); // External link
  };

  return (
    <>
      <div className='w-[20%] h-full border-r-2 border-zinc-500 p-5 overflow-auto'>
        <h3 className='text-2xl text-white font-bold flex align-baseline'>
          <i className="text-[#6556CD] ri-tv-fill mr-3"></i>
          <span className='text-2xl cursor-pointer'>Movies Mosaic</span>
        </h3>

        <nav className='flex flex-col text-zinc-400 text-xl gap-3'>
          <h1 className='text-white font-semibold text-xl mt-10 mb-2 cursor-pointer'>New Feeds</h1>

          <Link to="/trending" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-fire-fill mr-2"></i>
            Trending
          </Link>
          <Link to="/popular" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-magic-fill mr-2"></i>
            Popular
          </Link>
          <Link to="/movie" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-movie-2-fill mr-2"></i>
            Movies
          </Link>
          <Link to="/tvshows" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-tv-2-fill mr-2"></i>
            Tv Shows
          </Link>
          <Link to="/people" className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-team-fill mr-2"></i>
            People
          </Link>

          <hr className='bg-zinc-400' />

          <h1 className='text-white font-semibold text-xl mt-5 mb-2 cursor-pointer'>Web Info</h1>
          <Link onClick={() => handleRedirect()} className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-information-fill mr-2"></i>
            About Me
          </Link>
          <Link className='hover:bg-[#6556CD] hover:text-white rounded-lg duration-300 p-4 cursor-pointer'>
            <i className="ri-phone-fill mr-2"></i>
            Contact Us
          </Link>

        </nav>

      </div>
    </>
  )
}

export default SideNav