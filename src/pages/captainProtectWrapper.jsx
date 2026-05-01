import React, { use, useContext, useEffect } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { Navigate, useNavigate } from 'react-router-dom'


const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { captain, setCaptain } = useContext(CaptainDataContext)
  const { isLoading, setIsLoading } = useContext(true)
     
    useEffect(() => {
    if (!token) {
    navigate('/captain/login')
  }

    }, [token])
  
    if(isLoading) {
        return (
            <div>Loading....</div>
        )
    }
    
  return children
}

export default CaptainProtectWrapper


