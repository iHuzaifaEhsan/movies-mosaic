import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import Loader from './Loader'
import SideNav from './partials/SideNav'
import TopNav from './partials/TopNav'
import Header from './partials/Header'
import HorizontalCards from './partials/HorizontalCards'
import DropDown from './partials/DropDown'

const Home = () => {
  document.title = "Movies Mosaic | Homepage"

  const [wallpaper, setWallpaper] = useState(null);
  const [trending, setTrending] = useState(null);
  const [category, setCategory] = useState("all")

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
      const { data } = await axios.get(`trending/${category}/day`);
      setTrending(data.results);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    !wallpaper && GetWallpaper();
    GetTrending(); // Fetch data every time category changes
  }, [category]) // Add category as dependency

  return wallpaper ? (
    <>
      <SideNav />
      <div className='w-[80%] h-full overflow-auto'>
        <TopNav />
        <Header data={wallpaper} />

        <div className="flex justify-between mb-3 pt-6 px-5">
          <h1 className='text-3xl text-zinc-400 font-semibold'>Trending</h1>
          <DropDown 
            title={"Filter"} 
            options={["tv", "movie", "all"]} 
            func={(e) => setCategory(e.target.value)} // Correct the category set
          />
        </div>

        <HorizontalCards data={trending} />
      </div>
    </>
  ) : <Loader></Loader>
}

export default Home
