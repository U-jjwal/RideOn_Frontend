import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})
  
  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      username: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    })
    setFirstName('')
    setLastName('')
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

            <h3 className='text-lg font-medium  mb-2'>What's your name</h3>
            <div className='flex gap-4'>
              <input
             required
             value={firstName}
             onChange={(e) => {
              setFirstName(e.target.value)
             }}
             className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
             type='text'
            placeholder='First Name' 
            />

            <input
             required
             value={lastName}
             onChange={(e) => {
              setLastName(e.target.value)
             }}
             className='bg-[#eeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
             type='text'
            placeholder='Last Name' 
            />
            </div>
            
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
            <p className='text-center' >Already have an account? <Link to='/user/login' className='text-blue-600' >Login here
            </Link> </p>
        </div>

        <div>
          <p className='text-[15px] leading-tight '> By proceeding, you consent to get calls, whatsApp or SMS message,
            including by automated means, from RideOn and its affiliates to the number provided. 
          </p>
        </div>
    </div>
  )
}

export default UserSignup