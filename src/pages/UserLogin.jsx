import React from 'react'

const UserLogin = () => {
  return (
    <div className='p-7'>
          <img src='/src/assets/rideonlogo.png' alt='logo' className='h-[24%] '/>

        <div>
          <form>
            <h3>Enter your email</h3>
            <input
             required
             className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type='email'
            placeholder='Enter your email' 
            />
            <h3>Enter your password</h3>
            <input required
             className='bg-[#eeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
             type="password"
             placeholder='Enter your password' 
             />
            <button 
             className='bg-[#111] text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'
            >Login</button> 
        </form>
        </div>

        <div>
          <button
         className='bg-[#111] text-white font-semibold mb-7 rounded-xl px-4 py-2  w-full text-lg placeholder:text-base'

          >Sign in as Captain</button>
        </div>
    </div>
  )
}

export default UserLogin