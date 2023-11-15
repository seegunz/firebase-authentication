import React, { useState } from 'react'
import './signup.css'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth'
import {auth} from '../auth/firebase'
import { signOut } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export default function Signup() {
    const nav = useNavigate()

    function signout() {
        signOut(auth)
        nav('/login')
    }

    const [username, setUsername ] = useState('')
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password)
            await sendEmailVerification(newUser.user)
            await updateProfile(auth.currentUser, {displayName : username})
            signout()
        } catch (error) {
            setError(error.code)
        }
    }
  return (
    <div className='signup'>
      <h2>Welcome to Seegunz first ever social media platform. You do not have an account? kindly sign up below</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='username' value={username} onChange={e=> setUsername(e.target.value)}/>
        <input type="email" placeholder='email' value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e=> setPassword(e.target.value)}/>
        <button type='submit'>Signup</button>
        <p>{error}</p>
      </form>
    </div>
  )
}
