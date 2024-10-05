import { React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from './partials/TopNav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loader';

const Popular = () => {

  document.title = "Movies Mosaic | Popular"
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setPopular((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }

      // setPopular(data.results);
    } catch (error) {
      console.log(error)
    }
  }

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setPage(1);
      setPopular([]);
      GetPopular();
    }
  }

  useEffect(() => {
    refreshHandler();
  }, [category])


  return (
    popular.length > 0 ? (

      <div className='w-screen h-screen px-[3%] py-3 '>
        <div className='w-full flex items-baseline'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
          <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>Popular</h1>
          <TopNav></TopNav>
          <DropDown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)}></DropDown>
          <div className='w-[2%]'></div>
          
        </div>
   
        <InfiniteScroll dataLength={popular.length} next={GetPopular} hasMore={hasmore} loader={<h1>WOWOW</h1>}>
          <Cards data={popular} title={category}></Cards>
        </InfiniteScroll>
      </div>
  
  
  
    ) : <Loading></Loading>
  )
}


export default Popular