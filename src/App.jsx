import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'

const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Routes>
        <Route path='/' element={<Home></Home>} />
        <Route path='/trending' element={<Trending></Trending>}></Route>
        <Route path='/popular' element={<Popular></Popular>}></Route>
      </Routes>
    </div>
  )
}

export default App