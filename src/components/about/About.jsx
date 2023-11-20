import React, { useState } from 'react'
import './about.css'

export default function About() {
    const [input, setInput] = useState('')
    const [text, setText] = useState([])
    const [query, setQuery] = useState('')

    const filtered = text.filter(list =>{
        return list.toLowerCase().includes(query.toLowerCase())
    })

    function handleChange(e) {
        setQuery(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setText(prev=> {
            return [...prev, input]
        })
        setInput('')
    }
  return (
    <div className='about'>
        <h1>search items</h1>
        <input type="search" onChange={handleChange}/> <br /><br /><br />
        <form onSubmit={handleSubmit}>
            <input type="text" value={input} onChange={e=>setInput(e.target.value)}/>
            <button>submit</button>
        </form>
        {filtered.map(item=><div>{item} </div>)}
    </div>
  )
}
