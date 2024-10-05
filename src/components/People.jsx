import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import TopNav from './partials/TopNav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';
import Loading from './Loader';

const People = () => {

  document.title = "Movies Mosaic | Person";
  const navigate = useNavigate();
  const [category, setCategory] = useState("popular");
  const [person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasmore, setHasmore] = useState(true);

  const GetPerson = async () => {
    try {
      const { data } = await axios.get(`person/${category}?page=${page}`);

      if (data.results.length > 0) {
        setPerson((prev) => [...prev, ...data.results]);
        setPage(page + 1);
      } else {
        setHasmore(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const refreshHandler = () => {
    if (person.length === 0) {
      GetPerson();
    } else {
      setPage(1);
      setPerson([]);
      GetPerson();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return (
    person.length > 0 ? (
      <div className='w-screen h-screen px-[3%] py-3'>
        <div className='w-full flex items-baseline'>
          <i onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></i>
          <h1 className='text-2xl text-zinc-400 font-semibold pl-2 cursor-default'>People</h1>
          <TopNav />
          <div className='w-[2%]'></div>
        </div>

        <InfiniteScroll dataLength={person.length} next={GetPerson} hasMore={hasmore} loader={<h1>WOWOW</h1>}>
          <Cards data={person} title={category} />
        </InfiniteScroll>
      </div>
    ) : <Loading />
  )
}

export default People