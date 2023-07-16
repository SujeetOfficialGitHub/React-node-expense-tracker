import React from 'react'
import Signup from '../pages/signup/Signup'
import Home from '../pages/home/Home'
import { Routes, Route } from 'react-router-dom'
const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
    </Routes>
  )
}

export default Router