import React from 'react'

const UserLogin = () => {
  return (
    <div className='p-7'>
        <form>
            <h3>What's your email</h3>
            <input required type='email' placeholder='Enter your email' />
            <h3>Enter your password</h3>
            <input required type="password" placeholder='Enter your password' />
            <button>Login</button> 
        </form>
    </div>
  )
}

export default UserLogin