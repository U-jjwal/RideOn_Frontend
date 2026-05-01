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
        navigate("/captain/home")
      }
      
    }).catch((err) => {
      throw err.response.data
    })
    
    setEmail('')
    setPassword('')
  }
  
  
  
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
          <img src='/src/assets/ridecaptain.png' alt='logo' className='h-[24%] '/>

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
            <p className='text-center' >Join a fleet? <Link to='/captain/signup' className='text-blue-600' >Register as a Captain</Link> </p>
        </div>

        <div>
          <Link to='/user/login'
         className='bg-[#3f63c8] flex items-center justify-center text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'

          >Sign in as User</Link>
        </div>
    </div>
  )
}

export default CaptainLogin