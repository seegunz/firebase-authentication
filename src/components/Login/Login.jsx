import React, {useState} from 'react'
import './login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {auth} from '../auth/firebase'
import {useNavigate} from 'react-router-dom'

export default function Login() {
    const nav = useNavigate()

    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [error, setError ] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            nav('/')
        } catch (error) {
            setError(error.code)
        }
    }
  return (
    <div className='signup'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='email' value={email} onChange={e=> setEmail(e.target.value)}/>
        <input type="password" placeholder='password' value={password} onChange={e=> setPassword(e.target.value)}/>
        <p className='reset' onClick={()=>nav('/resetpw')}>forgot password? reset</p>
        <button type='submit'>Login</button>
        <p>{error}</p>
      </form>
    </div>
  )
}
