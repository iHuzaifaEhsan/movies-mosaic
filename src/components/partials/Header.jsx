import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (

    <div style={{ background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path || data.logo_path || data.still_path || data.poster_path})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat" }} className='w-full h-[65vh] flex flex-col justify-end items-start p-[5%]'>

      <h1 className='w-[70%] text-5xl font-black text-white'>{data.name || data.title || data.original_name || data.original_title}</h1>

      <p className='w-[70%] mt-3 mb-3 text-white'>{data.overview.slice(0, 200)}....<Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">more</Link> </p>

      <p className="text-white gap-x-1">
        <i className="text-yellow-500  ri-megaphone-fill"></i>{data.release_date || "No Information"}
        <i className="ml-5 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
      </p>

      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className="text-white p-4 rounded bg-[#6556CD] mt-4">Watch Trailer</Link>

    </div>
  )
}

export default Header