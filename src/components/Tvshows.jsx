import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from './partials/TopNav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loader';

const Tvshows = () => {

  document.title = "Movies Mosaic | Tv Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const GetTv = async () => {
    try {
      const { data } = await axios.get(`tv/${category}?page=${page}`);

      if (data.results.length > 0) {
        setTv((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (tv.length === 0) {
      GetTv();
    } else {
      setPage(1);
      setTv([]);
      GetTv();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    tv.length > 0 ? (
      <div className='w-screen h-screen px-[3%] py-3'>
        <div className='w-full flex items-baseline'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
          <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>TV_Shows</h1>
          <TopNav />
          <DropDown title="Category" options={["on_the_air", "popular", "top_rated", "airing_today"]} func={(e) => setCategory(e.target.value)} />
          <div className='w-[2%]'></div>
        </div>

        <InfiniteScroll dataLength={tv.length} next={GetTv} hasMore={hasmore} loader={<h1>WOWOW</h1>}>
          <Cards data={tv} title="tv" />
        </InfiniteScroll>
      </div>
    ) : <Loading />
  )
}

export default Tvshows