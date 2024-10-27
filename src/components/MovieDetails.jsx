import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieActions';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loader'
import HorizontalCards from './partials/HorizontalCards'

const Moviedetails = () => {
  document.title = "Movies Mosaic | Movies";
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { info } = useSelector(state => state.movie);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie())
    }
  }, [id]);

  return info ? (
    <div style={{ background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='w-screen h-screen px-[10%] overflow-x-hidden relative'>

      {/* Part 1 Navigation */}
      <nav className='relative h-[10vh] w-full text-zinc-100 flex gap-10 items-center text-xl'>
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

        <div className='content ml-[5%] text-white'>
          <h1
            className='text-5xl font-black text-white'> {info.detail.name || info.detail.original_name || info.detail.original_title}
            <small className='text-xl font-bold text-white'>({info.detail.release_date.split("-")[0]})</small>
          </h1>
          <div className='flex text-zinc-100 items-center gap-x-5 mt-3 mb-5'>
            <span className='rounded-full text-sm font-semibold text-white w-[5vh] h-[5vh] flex justify-center items-center bg-yellow-600'>
              {(info.detail.vote_average * 10).toFixed()}<sup>%</sup>
            </span>
            <h1 className='w-[60px] font-semibold text-2xl leading-6'>User Score</h1>
            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(",")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>
          <h1 className='text-xl font-semibold italic text-zinc-200'>{info.detail.tagline}</h1>
          <h1 className='text-2xl font-semibold mt-5 mb-3'>Overview</h1>
          <p>{info.detail.overview}</p>
          <h1 className='text-2xl font-semibold mt-5 mb-3'>Movie Translated</h1>
          <p className='mb-10'>{info.translations.join(", ")}</p>
          <Link className='p-5 bg-[#6556CD] rounded-lg' to={`${pathname}/trailer`}><i className=" text-2xl mr-3 ri-play-fill"></i>Play Trailer</Link>
        </div>


      </div>

      {/* Part 3 Available on Plateforms */}
      <div className='w-[80%] flex flex-col gap-y-5 mt-20 mb-10'>
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
            <h1>Available for Rent</h1>
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


      {/* Part 4 Recomendations and Similar Stuff */}
      <hr className='mb-8'/>
      <h1 className='text-4xl mb-3 font-bold text-white'>Recommendations & Similar Stuff</h1>
      <HorizontalCards data={info.recommendations.length > 0 ? info.recommendations : info.similar}></HorizontalCards>
      <Outlet/>
    </div>
  ) : <Loading></Loading>
};

export default Moviedetails;
