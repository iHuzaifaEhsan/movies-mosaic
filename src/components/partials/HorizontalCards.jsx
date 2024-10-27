import { Link } from "react-router-dom";
import DropDown from "./DropDown";

const HorizontalCards = ({ data }) => {
  return (
    <div className='w-full h-[50vh] p-5'>
      <div className='w-full min-h-[50vh] flex overflow-scroll'>
        {data.map((d) => (
          <Link to={`/${d.media_type}/details/${d.id}`} key={d.id} className='min-w-[25%] h-full mr-5 bg-zinc-900'>

            {/* Fallback image to prevent broken links */}
            <img
              className="w-full h-[50%] object-cover"
              src={`https://image.tmdb.org/t/p/original/${d.backdrop_path || d.profile_path || d.logo_path || d.still_path || d.poster_path || 'path-to-default-image.jpg'}`}
              alt={d.name || d.title || d.original_name || d.original_title || 'No title available'}
            />

            <div className="px-3">
              {/* Title Fallback */}
              <h1 className='mt-4 text-lg font-black text-white'>
                {d.name || d.title || d.original_name || d.original_title || 'Untitled'}
              </h1>

              {/* Overview with fallback and length check */}
              <p className='mt-2 mb-4 text-white'>
                {d.overview ? d.overview.slice(0, 80) : 'No overview available'}
                {d.overview && d.overview.length > 80 && '....'}
                <span className="text-blue-400"> more</span>
              </p>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalCards;
