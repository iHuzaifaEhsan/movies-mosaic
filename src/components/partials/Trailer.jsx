import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideos = useSelector((state) => state[category].info.videos);
  console.log(ytvideos)
  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-[100] bg-[rgba(0,0,0,.9)]'>

      <ReactPlayer url={`https://www.youtube.com/watch?v=${ytvideos.key}`} />

    </div>
  )
}

export default Trailer