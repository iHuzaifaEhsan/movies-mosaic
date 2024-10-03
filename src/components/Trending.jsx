import { React, useEffect, useState } from 'react'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import TopNav from './partials/TopNav'
import DropDown from './partials/DropDown'
import Cards from './partials/Cards'
import Loading from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  document.title = "Movies Mosaic | Trending"
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("day");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1)

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`trending/${category}/${duration}`);
      // setTrending(data.results);
      setTrending((prev)=>[...prev, ...data.results]);
      setPage(page+1);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    GetTrending();
  }, [category, duration])


  return trending.length > 0 ? (

    <div className='w-screen h-screen px-[3%] py-3 '>
      <div className='w-full flex items-baseline'>
        <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
        <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>Trending</h1>
        <TopNav></TopNav>
        <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setCategory(e.target.value)}></DropDown>
        <div className='w-[2%]'></div>
        <DropDown title="Duration" options={["week", "day"]} func={(e) => setDuration(e.target.value)}></DropDown>
      </div>

      <InfiniteScroll dataLength={trending.length} next={GetTrending} hasMore={true} loader={<h1>WOWOW</h1>}>
        <Cards data={trending} title={category}></Cards>
      </InfiniteScroll>
    </div>



  ) : <Loading></Loading>
}

export default Trending