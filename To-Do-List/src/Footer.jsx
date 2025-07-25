import React from 'react'
import Signature from "./assets/Signature.png";

export default function Footer() {
  return (
    <footer className="text-gray-600 bg-zinc-200 body-font w-full shadow-md ">
    <div className="container mx-auto py-4 flex justify-center">
      <img className='h-15 w-auto' src={Signature} alt="Signature" />
    </div>
  </footer>
  
  )
}
