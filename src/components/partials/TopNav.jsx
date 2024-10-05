import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import noimage from '../../../public/noimage.png'

const TopNav = () => {

  const [query, setquery] = useState("");
  const [searches, setSearches] = useState([])

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetSearches()
  }, [query])


  return (
    <>
      <div className='w-full h-[10vh] relative flex justify-start items-center pl-[25%]'>

        <i className="ri-search-line text-2xl text-zinc-400 cursor-pointer"></i>

        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className='w-[56%] mx-10 p-5 text-xl text-white outline-none bg-transparent' type="text" placeholder='Search any movie, season or artist' />

        {query.length > 0 && <i onClick={() => setquery("")} className="ri-close-fill text-2xl text-zinc-400 cursor-pointer"></i>}

        <div className='z-[999] absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] left-[28%] overflow-auto rounded'>

          {searches?.map((s, i) => (
            <Link key={i} className='hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 p-10 w-[100%] flex justify-start items-center border-zinc-100 border-b-2'>
              <img
                src={s.backdrop_path || s.profile_path || s.logo_path || s.still_path || s.poster_path ? `https://image.tmdb.org/t/p/original/${s.backdrop_path || s.profile_path || s.logo_path || s.still_path || s.poster_path}` : noimage}
                className='w-[13vh] h-[13vh] object-cover rounded mr-10 shadow-lg' />
              <span>{s.name || s.title || s.original_name || s.original_title}</span>
            </Link>
          ))}

        </div>
      </div>
    </>
  )
}

export default TopNav