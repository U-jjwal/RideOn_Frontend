import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
        <div className='h-screen flex justify-between flex-col w-full'>
            <img src='/src/assets/RideOn.png' alt='logo' className='h-[84%] w-screen  self-center '/>
            <div className='bg-white py-5 px-4 '>
                <h2 className='text-3xl font-bold'>Get Started with RideOn</h2>
                <Link to="/user/login" className='w-full flex items-center justify-center bg-black text-white py-3 rounded-xl mt-2'>Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Home