import React, { use, useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)
  const [ isLoading, setIsLoading ] = useState(true)

   useEffect(() => {
    if (!token) {
    navigate('/user/login')
  }

   }, [token])

   axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200) {
            setUser(res.data.user)
            setIsLoading(false)
        }
    }).catch((err) => {
        console.log(err.message)
        localStorage.removeItem('token')
        navigate('/user/login')
    })
    if(isLoading) {
        return (
            <div>Loading.... </div>
        )
    }
  
  return children
}

export default UserProtectWrapper


