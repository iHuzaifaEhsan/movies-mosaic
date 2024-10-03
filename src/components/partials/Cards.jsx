import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({ data, title }) => {
  return (
    <div className='flex flex-wrap w=[full]'>
      {data.map((c, i) =>
        <Link className='w-[25vh] mr-[5%] mb-[5%]' key={i}>
          <img className='h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path || c.logo_path || c.still_path}`} alt="" />
          {c.name || c.original_name || c.original_title}
        </Link>)}
    </div>
  )
}

export default Cards