import { Link } from "react-router-dom"
import DropDown from "./DropDown"

const HorizontalCards = ({ data }) => {
  return (
    <div className='w-full h-[50vh] p-5'>
      <div className=" flex justify-between  mb-5">
        <h1 className='text-3xl text-zinc-400 font-semibold'>Trending</h1>
        <DropDown title={"FIlter"} options={["TV", "Movie", "All"] }></DropDown>
      </div>
      <div className='w-full h-[50vh] flex overflow-scroll'>
        {data.map((d, i) => <div key={i} className='min-w-[25%] h-full mr-5 bg-zinc-900'>

          <img className="w-full h-[50%] object-cover" src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path || d.logo_path || d.still_path || d.poster_path}`} alt="" />

          <div className="px-3">
            <h1 className='mt-2 text-lg font-black text-white'>{d.name || d.title || d.original_name || d.original_title}</h1>

            <p className=' mt-2 mb-2 text-white'>{d.overview.slice(0, 80)}....<span className="text-blue-400">more</span> </p>
          </div>

        </div>)}
      </div>
    </div>
  )
}

export default HorizontalCards