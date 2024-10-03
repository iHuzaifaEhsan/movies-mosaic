import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='flex flex-wrap w=[full] mt-5'>
      {data.map((c, i) =>
        <Link className='w-[25vh] mr-[5%] mb-[5%]' key={i}>
          <img className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] ' src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path || c.logo_path || c.still_path}`} alt="" />
          <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
          {c.name || c.original_name || c.original_title}
          </h1>
        </Link>)}
    </div>
  )
}

export default Cards