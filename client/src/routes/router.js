import React from 'react'
import Signup from '../pages/signup/Signup'
import Home from '../pages/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login/Login'
import { useSelector } from 'react-redux'
const Router = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  return (
    <Routes>
        <Route path='/' element={isLoggedIn ? <Home/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!isLoggedIn ? <Signup/> : <Navigate to="/" />} />
        <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/" />} />
    </Routes>
  )
}

export default Router