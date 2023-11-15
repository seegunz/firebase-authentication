import React, {useState} from 'react'
import './login.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import {auth} from '../auth/firebase'


export default function Reset() {

    const [email, setEmail ] = useState('')
    const [error, setError ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await sendPasswordResetEmail(auth, email)
            setError('reset link sent to your email')
        } catch (error) {
            setError(error.code)
        }
    }
  return (
    <div className='signup'>
      <h1>Reset password for email</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='email' value={email} onChange={e=> setEmail(e.target.value)}/>
        <button type='submit'>Reset</button>
        <p>{error}</p>
      </form>
    </div>
  )
}
