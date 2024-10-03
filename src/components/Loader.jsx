import React from 'react'
import Loader from '../../public/Loader.gif'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <img className='h-[70%] object-cover' src={Loader} alt="" />
    </div>
  )
}

export default Loading