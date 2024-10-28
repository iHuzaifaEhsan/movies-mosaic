import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadperson, removeperson } from '../store/actions/personActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loader'
import HorizontalCards from './partials/HorizontalCards'
import Dropdown from './partials/DropDown'

const PersonDetails = () => {
  document.title = "Movies Mosaic | People Details";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector(state => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState("movie")

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson())
    }
  }, [id]);
  return info ? (
    <div className='px-[10%] w-screen flex flex-col'>
      {/* Part 1 Navigation */}
      <nav className='relative w-full text-zinc-100 flex gap-10 items-center text-xl'>
        <Link onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></Link>
      </nav>

      <div className='w-full flex'>
        {/* Part 2 left Poster and Details */}
        <div className='w-[20%] '>
          <img
            className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
          <hr className='mt-10 mb-5 border-none h-[2px] bg-zinc-500' />
          {/* Social Media Links */}
          <div className='text-2xl text-white flex gap-x-5'>
            <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}><i className="ri-facebook-circle-fill hover:text-[#6556CD]"></i></a>
            <a target='_blank' href={`https://m.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-global-fill hover:text-[#6556CD]"></i></a>
            <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`} className='ri-instagram-fill hover:text-[#6556CD]'></a>
            <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`} className='ri-twitter-x-fill hover:text-[#6556CD]'></a>
          </div>
          {/* Personal Information */}
          <h1 className='text-2xl text-zinc-400 font-semibold my-5'>Personal Info</h1>

          <h1 className='text-lg text-zinc-400 font-semibold'>Known For</h1>
          <h1 className='text-zinc-400'>{info.detail.known_for_department}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-4'>Gender</h1>
          <h1 className='text-zinc-400'>{info.detail.gender === 2 ? "Male" : "Female"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-4'>Birthday</h1>
          <h1 className='text-zinc-400'>{info.detail.birthday}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-4'>Deathday</h1>
          <h1 className='text-zinc-400'>{info.detail.deathday ? info.detail.deathday : "Still Alive"}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-4'>Place Of Birth</h1>
          <h1 className='text-zinc-400'>{info.detail.place_of_birth}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-4'>Also Known As</h1>
          <h1 className='text-zinc-400'>{info.detail.also_known_as.join(",")}</h1>
        </div>

        {/* Part 3 right Details and Information */}
        <div className='w-[80%] ml-[5%]'>
          <h1 className='text-6xl text-zinc-400 font-black my-5'>{info.detail.name}</h1>
          <h1 className='text-xl text-zinc-400 font-semibold'>Biography</h1>
          <p className='text-zinc-400 mt-3'>{info.detail.biography}</p>
          <h1 className='text-lg mt-5 text-zinc-400 font-semibold'>Known For</h1>
          <HorizontalCards data={info.combinedCredits.cast}></HorizontalCards>

          <div className='w-full flex justify-between mt-20'>
            <h1 className='text-xl text-zinc-400 font-semibold'>Acting</h1>
            <Dropdown title="Category" options={["tv", "movie"]} func={(e) => setCategory(e.target.value)}></Dropdown>
          </div>
          <div className='list-disc text-zinc-400 w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-700 mt-10 mb-20 p-5'>
            {info[category + "Credits"].cast.map((c, i) => 
            <li key={i} className='hover:text-white duration-300 cursor-pointer mt-5'>
            <Link to={`/${category}/details/${c.id}`}>
            <span>{c.name || c.original_name || c.original_title}</span>
            <span className='block ml-5'>
              {c.character && `Character: ${c.character}`}
            </span>
            </Link>
          </li>
            )}
            
          </div>
        </div>
      </div>



    </div>
  ) : <Loading></Loading>
}

export default PersonDetails



