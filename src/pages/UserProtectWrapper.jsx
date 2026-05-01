import React, { use, useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'


const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

   useEffect(() => {
    if (!token) {
    navigate('/user/login')
  }

   }, [token])
  
  return children
}

export default UserProtectWrapper


