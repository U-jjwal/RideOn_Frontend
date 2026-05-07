import React, { use, useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const {user, setUser} = useContext(UserDataContext)
  
  const submitHandler = (e) => {
    e.preventDefault()
    const loginUser = {
      email: email,
      password: password
    }


        const res = axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, loginUser)
    .then((res) => {
      

      if(res.status === 200) {
      const data = res.data
      // console.log(res.data)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/home')
      
    }
      
    }).catch((err) => {
      throw err.response.data
    })
    
    

    setEmail('')
    setPassword('')
  }

  
  return (
    <div className='p-7 flex flex-col justify-between h-screen bg-gray-50'>
      <div className='w-full max-w-md mx-auto'>
        <div className='flex justify-center mb-10 mt-6'>
          <img src='/src/assets/rideonlogo.png' alt='logo' className='w-48 object-contain drop-shadow-md'/>
        </div>

        <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Welcome Back</h2>
          <form onSubmit={submitHandler}>
            <div className='mb-5'>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Email Address</label>
              <input
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className='input-field'
               type='email'
               placeholder='name@example.com' 
              />
            </div>
            <div className='mb-8'>
              <label className='block text-gray-700 text-sm font-semibold mb-2'>Password</label>
              <input required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
               className='input-field'
               type="password"
               placeholder='Enter your password' 
               />
            </div>
            <button className='btn-primary mb-6'>Login to Account</button> 
        </form>
            <p className='text-center text-gray-600' >New here? <Link to='/user/signup' className='text-blue-600 font-semibold hover:underline' >Create new Account</Link> </p>
        </div>
      </div>

      <div className='w-full max-w-md mx-auto pb-8 mt-6'>
        <Link to='/captain/login' className='btn-secondary border-green-500 text-green-600 hover:bg-green-50'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  )
}

export default UserLogin