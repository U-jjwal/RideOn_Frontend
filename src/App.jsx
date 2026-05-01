import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout '
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/captainProtectWrapper'

const App = () => {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/captain/signup" element={<CaptainSignup />} />
        <Route path="/captain/login" element={<CaptainLogin />} />
        <Route path='/user/home' element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />

        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path='/captain/home' element={
          <CaptainProtectWrapper>
            <CaptainHome />   
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App