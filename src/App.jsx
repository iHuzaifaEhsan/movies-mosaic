import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'
import People from './components/People'

const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/trending' element={<Trending></Trending>}></Route>
        <Route path='/popular' element={<Popular></Popular>}></Route>
        <Route path='/movie' element={<Movie></Movie>}></Route>
        <Route path='/tvshows' element={<Tvshows></Tvshows>}></Route>
        <Route path='/people' element={<People></People>}></Route>
        <Route path='/me'></Route>
      </Routes>
    </div>
  )
}

export default App