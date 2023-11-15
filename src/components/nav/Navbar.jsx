import React from 'react'
import './nav.css'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import {auth} from '../auth/firebase'
import { signOut } from 'firebase/auth'
import {useNavigate} from 'react-router-dom'

export default function Navbar() {
    const nav = useNavigate()

    const {user} = useContext(AppContext)

    function handleClick() {
        signOut(auth)
        nav('/login')
    }

  return (
    <div className='nav'>
      <h1 onClick={()=>{nav('/')}} style={{cursor:'pointer'}}>LOGO</h1>
      <nav>
        <Link onClick={()=>{nav('/')}} style={{cursor:'pointer'}}>Home</Link>
        <Link to={'/about'}>About</Link>
        <Link>Service</Link>

        {user ? <button onClick={handleClick}>Logout</button> : <button onClick={()=> nav('/login')}>Login</button>}
      </nav>
    </div>
  )
}
