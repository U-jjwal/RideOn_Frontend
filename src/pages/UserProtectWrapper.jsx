import React, { use, useContext, useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'


const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
    console.log(token)
  if (!token) {
    return <Navigate to="/user/login" />
  }

  return children
}

export default UserProtectWrapper


