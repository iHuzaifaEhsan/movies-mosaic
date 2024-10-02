import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

const App = () => {
  return (
    <div className='w-screen h-screen flex'>
      <Routes>
        <Route path='/' element={<Home></Home>} />
      </Routes>
    </div>
  )
}

export default App