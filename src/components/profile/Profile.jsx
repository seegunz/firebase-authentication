import React, { useEffect, useState } from 'react'
import './profile.css'
import { db } from '../auth/firebase'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { TiDelete } from "react-icons/ti";


export default function Profile() {
    const {user} = useContext(AppContext)
    const [input, setInput] = useState('')
    const [list, setList] = useState([])

    const value = collection(db, "post")

    useEffect(()=>{
      async function getData() {
        const dbVal = await getDocs(value)
        setList(dbVal.docs.map(doc=>({...doc.data(), id:doc.id})))
      }
      getData()
    })

    async function handleSubmit(e) {
      e.preventDefault()
      await addDoc(value, {addPost:input})

      // setList(prev=>{
      //   return ([...prev, input])
      // })
       setInput('')
    }

    function handleDelete() {
      
    }
    
  return (
    <div className='profile'>
      <h1>Welcome {user?.displayName}</h1>
      <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Add Post' value={input} onChange={e=>setInput(e.target.value)}/>
          {/* <input type="file" placeholder='Add Post' value={input} onChange={e=>setInput(e.target.value)}/> */}
          <button type="submit">Add Post</button>
      </form>
      <div className='post'>
          {list.sort().map((items, i) => <div key={i}><p style={{paddingLeft:'3px'}}>{items.addPost}</p> <p className='delete-post' onClick={handleDelete}><TiDelete /></p> </div>)}
      </div>
    </div>
  )
}
