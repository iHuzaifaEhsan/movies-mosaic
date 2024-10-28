import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from '../Notfound';

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(-1);
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideos = useSelector((state) => state[category].info.videos);
  return (
    <div className='absolute top-0 left-0 w-screen h-screen flex items-center justify-center z-[100] bg-[rgba(0,0,0,.9)]'>

     
      <Link onClick={() => navigate(-1)} className="ri-close-large-line hover:text-[#6556CD] cursor-pointer text-2xl text-zinc-400 font-semibold absolute right-[5%] top-[5%]"></Link>
      {ytvideos ?  <ReactPlayer controls url={`https://www.youtube.com/watch?v=${ytvideos.key}`} />: <Notfound></Notfound>}
      </div>

  
  )
}

export default Trailer