import React from 'react'
import Not from '../../public/404.gif'

const Notfound = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black'>
      <img className='h-[70%] object-cover' src={Not} alt="" />
    </div>
  )
}

export default Notfound