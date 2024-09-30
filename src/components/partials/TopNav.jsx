import { useState } from 'react'
import { Link } from 'react-router-dom'

const TopNav = () => {
  
  const [query, setquery] = useState("");

  return (
    <>
      <div className='w-full h-[10vh] relative flex justify-start items-center  ml-[20%]'>
        <i className="ri-search-line text-2xl text-zinc-400 cursor-pointer"></i>
        <input
        onChange={(e)=> setquery(e.target.value)}
        value={query}
        className='w-[45%] mx-10 p-5 text-xl text-white outline-none bg-transparent' type="text" placeholder='Search anything' />
        {query.length > 0 && <i onClick={()=>setquery("")} className="ri-close-fill text-2xl text-zinc-400 cursor-pointer"></i>}
        <div className='absolute w-[50%] max-h-[50vh] bg-zinc-200 top-[100%] overflow-auto rounded'>
          {/* <Link className='hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 p-10 w-[100%] flex justify-start items-center border-zinc-100 border-b-2'>
          <img src='' alt=''></img>
          <span>Hello Everyone</span>
          </Link> */}
        </div>
      </div>
    </>
  )
}

export default TopNav