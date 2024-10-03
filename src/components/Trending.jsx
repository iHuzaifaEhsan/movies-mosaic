import { React, useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import TopNav from './partials/TopNav'
import DropDown from './partials/DropDown'
import Cards from './partials/Cards'

const Trending = () => {
  document.title = "Movies Mosaic | Trending"
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}`);
      setTrending(data.results);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetTrending();
  }, [category, duration])


  return (

    <div className='w-screen h-screen px-[3%] py-3 overflow-x-hidden'>
      <div className='w-full flex items-baseline'>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
        <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>Trending</h1>
        <TopNav></TopNav>
        <DropDown title="Category" options={["movie", "tv", "all"]} func={(e)=>setCategory(e.target.value)}></DropDown>
        <div className='w-[2%]'></div>
        <DropDown title="Duration" options={["week", "day"]} func={(e)=>setDuration(e.target.value)}></DropDown>
      </div>
      <Cards data={trending} title={category}></Cards>
    </div>



  )
}

export default Trending