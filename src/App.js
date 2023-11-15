import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { About, Login, Nav, Profile, Reset, Signup } from './components'
import { createContext } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {auth} from './components/auth/firebase'

export const AppContext = createContext()

export default function App() {
  const [user, setUser] = useState({})

  //use effect is used because there is no function we can call our onAuthStateChanged() hence why we called it in a use effect

  useEffect(()=>{
    onAuthStateChanged(auth, (credential)=>{
      setUser(credential)
    })
  },[])

  return (
    <div>
      <AppContext.Provider value={{user}}>
        <Router>
          <Nav/>
            <Routes>
                {user ? 
                  <Route path='/' element={<Profile/>}/> :
                  <Route path='/' element={<Signup/>}/>
                }
                <Route path='login' element={<Login/>}/>
                <Route path='resetpw' element={<Reset/>}/>
                <Route path='about' element={<About/>}/>
            </Routes>
        </Router>
      </AppContext.Provider>
    </div>
  )
}
