import React from 'react'
import Navbar from './Navbar'
import Todolist from './Todolist.jsx'
import Footer from './Footer'

export default function App() {
  return (
    <div className="bg-zinc-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Todolist />
      </main>
      <Footer />
    </div>
  );
}

