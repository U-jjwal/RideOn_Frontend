import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {

      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password
    }


    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`, newUser)
      .then((res) => {
        // console.log(res.data)

        if (res.status === 201) {
          const data = res.data

          setUser(data.user)
          localStorage.setItem('token', data.token)
          navigate('/home')

        }

      }).catch((err) => {
        // console.log(err.response.data)

      })



    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')

  }

  return (
    <div className='p-7 flex flex-col justify-between min-h-screen bg-gray-50'>
      <div className='w-full max-w-md mx-auto'>
        <div className='flex justify-center mb-6 mt-4'>
          <img src='/src/assets/rideonlogo.png' alt='logo' className='w-40 object-contain drop-shadow-md' />
        </div>

        <div className='bg-white p-8 rounded-3xl shadow-xl border border-gray-100'>
          <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Create Account</h2>
          <form onSubmit={submitHandler}>
            <div className='flex gap-4 mb-4'>
              <div className='w-1/2'>
                <label className='block text-gray-700 text-sm font-semibold mb-2'>First Name</label>
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className='input-field'
                  type='text'
                  placeholder='First Name'
                />
              </div>
              <div className='w-1/2'>
                <label className='block text-gray-700 text-sm font-semibold mb-2'>Last Name</label>
                <input
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className='input-field'
                  type='text'
                  placeholder='Last Name'
                />
              </div>
            </div>

            <div className='mb-4'>
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
                placeholder='Create a password'
              />
            </div>
            <button className='btn-primary mb-6'>Create Account</button>
          </form>
          <p className='text-center text-gray-600' >Already have an account? <Link to='/user/login' className='text-blue-600 font-semibold hover:underline' >Login here
          </Link> </p>
        </div>
      </div>

      <div className='w-full max-w-md mx-auto mt-6 pb-6'>
        <p className='text-[13px] leading-tight text-gray-500 text-center'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from RideOn and its affiliates to the number provided.
        </p>
      </div>
    </div>
  )
}

export default UserSignup