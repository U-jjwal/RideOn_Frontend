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
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200) {
            setUser(res.data)
            setIsLoading(false)
        }
    }).catch((err) => {
        // console.log(err.message)
        navigate('/user/login')
    })
   }, [token, navigate, setUser])
    if(isLoading) {
        return (
            <div>Loading.... </div>
        )
    }
  
  return children
}

export default UserProtectWrapper


