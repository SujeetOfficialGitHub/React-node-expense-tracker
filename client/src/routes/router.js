import React from 'react'
import Signup from '../pages/signup/Signup'
import Home from '../pages/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login/Login'
import { useSelector } from 'react-redux'
import { decodeToken } from 'react-jwt';
import Leaderboard from '../pages/leaderboard/Leaderboard'
const Router = () => {
  const {isLoggedIn, token} = useSelector(state => state.auth)
  const decodedToken = decodeToken(token)
  const isPremium = decodedToken && decodedToken.isPremium
  return (
    <Routes>
        <Route path='/' element={isLoggedIn ? <Home/> : <Navigate to="/login" />} />
        <Route path='/leaderboard' element={isLoggedIn && isPremium ? <Leaderboard/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!isLoggedIn ? <Signup/> : <Navigate to="/" />} />
        <Route path='/login' element={!isLoggedIn ? <Login/> : <Navigate to="/" />} />
    </Routes>
  )
}

export default Router