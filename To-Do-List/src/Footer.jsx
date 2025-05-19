import React from 'react'
import Signature from "./Signature.png";

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font fixed bottom-0 w-full bg-white shadow-md">
    <div className="container mx-auto py-4 flex justify-center">
      <img className='h-15 w-auto' src={Signature} alt="Signature" />
    </div>
  </footer>
  
  )
}
