import React from 'react'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'

const Home = () => {
  document.title = "Movies Mosaic | Homepage"
  return (
    <>
    <SideNav></SideNav>
      <div className='w-[80%] h-full'>
        <TopNav></TopNav>
      </div>
    </>
  )
}

export default Home