import React from 'react'

export default function Navbar() {
    return (
        <header className="text-gray-600 body-font bg-zinc-200 shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-start">
                <a className="flex title-font font-medium items-center justify-start text-gray-900 ">
                <i className="fa-solid fa-rectangle-list text-zinc-700 text-2xl"></i>
                    <span className="ml-2 text-2xl text-zinc-700">To Do List</span>
                </a>
                
               
            </div>
        </header>

    )
}
