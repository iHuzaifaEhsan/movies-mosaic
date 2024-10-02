import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'

const Home = () => {
  document.title = "Movies Mosaic | Homepage"

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null)

  const GetWallpaper = async () => {
    try {
      const { data } = await axios.get("trending/all/day");
      let random = data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(random);
    } catch (error) {
      console.log(error)
    }
  }

  const GetTrending = async () => {
    try {
      const { data } = await axios.get("trending/all/day");
      setTrending(data.results);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    !wallpaper && GetWallpaper();
    !trending && GetTrending();
  }, [])

  return wallpaper ? (
    <>
      <SideNav></SideNav>
      <div className='w-[80%] h-full overflow-auto'>
        <TopNav></TopNav>
        <Header data={wallpaper} ></Header>
        <HorizontalCards data={trending}></HorizontalCards>
      </div>
    </>
  ) : <h1 className='text-white'>LOADING...</h1>
}

export default Home