import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const [ isLoading, setIsLoading ] = useState(true)
     
    useEffect(() => {
    if (!token) {
    navigate('/captain/login')
  }

    }, [token])

    
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((res) => {
        if(res.status === 200) {
            setCaptain(res.data.captain)
            setIsLoading(false)
        }
    }).catch((err) => {
        console.log(err.message)
        localStorage.removeItem('token')
        navigate('/captain/login')
    })
  
    if(isLoading) {
        return (
            <div>Loading.... </div>
        )
    }
    
  return children
}

export default CaptainProtectWrapper


