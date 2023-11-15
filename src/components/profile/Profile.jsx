import React from 'react'
import './profile.css'
import {auth} from '../auth/firebase'
import { useContext } from 'react'
import { AppContext } from '../../App'


export default function Profile() {
    const {user} = useContext(AppContext)
    
  return (
    <div>
      profile {user?.displayName}
    </div>
  )
}
