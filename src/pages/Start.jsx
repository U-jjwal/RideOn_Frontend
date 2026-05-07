import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-screen w-full relative overflow-hidden bg-gray-900'>
        {/* Background Image Setup */}
        <img src='/src/assets/RideOn.png' alt='Background' className='absolute inset-0 w-full h-full object-cover opacity-80' />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90'></div>
        
        {/* Content Container */}
        <div className='absolute bottom-0 w-full p-6 pb-10'>
            <div className='glass-dark rounded-3xl p-8 transform transition-all duration-500 hover:scale-[1.02]'>
                <h2 className='text-4xl font-bold mb-4 tracking-tight text-white'>Get Started with <span className="text-blue-400">RideOn</span></h2>
                <p className='text-gray-300 mb-8 text-lg'>Your premium ride experience awaits.</p>
                <Link to="/user/login" className='btn-primary bg-blue-600 hover:bg-blue-700 border-none text-white shadow-lg shadow-blue-500/30 text-xl py-4'>
                  Continue
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Start