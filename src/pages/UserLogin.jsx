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
      console.log(res.data)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      navigate('/user/home')
      
    }
      
    }).catch((err) => {
      throw err.response.data
    })
    
    

    setEmail('')
    setPassword('')
  }

  
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
          <img src='/src/assets/rideonlogo.png' alt='logo' className='h-[24%] '/>

        <div>
          <form onSubmit={(e) => {{
            submitHandler(e)
          }}}>
            <h3>Enter your email</h3>
            <input
             required
             value={email}
             onChange={(e) => {
              setEmail(e.target.value)
             }}
             className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type='email'
            placeholder='Enter your email' 
            />
            <h3>Enter your password</h3>
            <input required
            value={password}
            onChange={(e) => {
            setPassword(e.target.value)
             }}
             className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="password"
             placeholder='Enter your password' 
             />
            <button 
             className='bg-[#111] text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'
            >Login</button> 
        </form>
            <p className='text-center' >New here? <Link to='/user/signup' className='text-blue-600' >Create new Account</Link> </p>
        </div>

        <div>
          <Link to='/captain/login'
         className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'

          >Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin