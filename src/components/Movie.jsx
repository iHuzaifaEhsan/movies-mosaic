import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from './partials/TopNav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loader';

const Movie = () => {

  document.title = "Movies Mosaic | Movies";
  const navigate = useNavigate();
  const [category, setCategory] = useState("now_playing");
  const [movie, setMovie] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`movie/${category}?page=${page}`);

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (movie.length === 0) {
      GetMovie();
    } else {
      setPage(1);
      setMovie([]);
      GetMovie();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    movie.length > 0 ? (
      <div className='w-screen h-screen px-[3%] py-3'>
        <div className='w-full flex items-baseline'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
          <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>Movies</h1>
          <TopNav />
          <DropDown title="Category" options={["popular", "top_rated", "upcoming", "now_playing"]} func={(e) => setCategory(e.target.value)} />
          <div className='w-[2%]'></div>
        </div>

        <InfiniteScroll dataLength={movie.length} next={GetMovie} hasMore={hasmore} loader={<h1>WOWOW</h1>}>
          <Cards data={movie} title={category} />
        </InfiniteScroll>
      </div>
    ) : <Loading />
  );
};

export default Movie;
