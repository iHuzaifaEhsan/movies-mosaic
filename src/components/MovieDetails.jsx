import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loader'

const Moviedetails = () => {
  document.title = "Movies Mosaic | Movies";
  const navigate = useNavigate();
  const { info } = useSelector(state => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie())
    }
  }, []);

  return info ? (
    <div style={{ background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='w-screen h-screen px-[10%]'>

      {/* Part 1 Navigation */}
      <nav className='h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl'>
        <Link onClick={() => navigate(-1)} className="ri-arrow-left-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold"></Link>
        <a target='_blank' href={info.detail.homepage}><i className="ri-external-link-line hover:text-[#6556CD]"></i></a>
        <a target='_blank' href={`https://m.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className="ri-global-fill hover:text-[#6556CD]"></i></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}`} className='hover:text-[#6556CD]'>imdb</a>
      </nav>

      {/* Part 2 Poster and Details */}
      <div className='w-full flex'>
        <img
          className='h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]'
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt=""
        />

        <div className='content ml-[5%]'>
          <h1
            className='text-5xl font-black text-white'> {info.detail.name || info.detail.original_name || info.detail.original_title}
            <small className='text-xl font-bold text-zinc-300'>({info.detail.release_date.split("-")[0]})</small>
          </h1>
        </div>


      </div>

      {/* Part 3 Available on Plateforms */}
      <div className='w-[80%] flex flex-col gap-y-5 mt-5'>
        {info.watchproviders && info.watchproviders.flatrate &&
          <div className='flex gap-x-5 items-center text-white'>
            <h1>Available on Plateforms</h1>
            {info.watchproviders.flatrate.map((w, i) => (
              <img title={w.provider_name} className='w-[5vh] h-[5vh] object-cover rounde-md cursor-pointer' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))
            }
          </div>}

        {info.watchproviders && info.watchproviders.rent &&
          <div className='flex gap-x-5 items-center text-white'>
            <h1>Available on Rent</h1>
            {info.watchproviders.rent.map((w, i) => (
              <img title={w.provider_name} className='w-[5vh] h-[5vh] object-cover rounde-md cursor-pointer' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))
            }
          </div>}

        {info.watchproviders && info.watchproviders.buy &&
          <div className='flex gap-x-5 items-center text-white'>
            <h1>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => (
              <img title={w.provider_name} className='w-[5vh] h-[5vh] object-cover rounde-md cursor-pointer' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />
            ))
            }
          </div>}
      </div>


    </div>
  ) : <Loading></Loading>
};

export default Moviedetails;
