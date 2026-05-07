import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {

  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
 
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  
  const submitHandler = async (e) => {
    e.preventDefault()
    const captain = {
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain)
    .then((res) => {

      if(res.status === 200){
        const data = res.data;
        setCaptain(data.user);
        localStorage.setItem("token", data.token);
        navigate("/captain-home")
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
          <img src='/src/assets/ridecaptain.png' alt='logo' className='w-48 object-contain drop-shadow-md'/>
        </div>

        <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Captain Login</h2>
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
            <button className='btn-primary mb-6 bg-yellow-500 hover:bg-yellow-600 text-black shadow-yellow-500/30'>Login as Captain</button> 
        </form>
            <p className='text-center text-gray-600' >Join a fleet? <Link to='/captain/signup' className='text-yellow-600 font-semibold hover:underline' >Register as a Captain</Link> </p>
        </div>
      </div>

      <div className='w-full max-w-md mx-auto pb-8 mt-6'>
        <Link to='/user/login' className='btn-secondary border-blue-500 text-blue-600 hover:bg-blue-50'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin