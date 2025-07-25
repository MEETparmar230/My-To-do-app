import React from 'react'
import Navbar from './Navbar'
import Todolist from './Todolist.jsx'
import Footer from './Footer'

export default function App() {
  return (
    <div className='bg-zinc-100 min-h-screen'>
      <Navbar/>
      <Todolist/>
      <Footer/>
    </div>
  )
}
