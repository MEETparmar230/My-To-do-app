import React from 'react'

export default function Navbar() {
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <i class="fa-solid fa-rectangle-list"></i>
                    <span className="ml-3 text-xl">To Do List</span>
                </a>
                
               
            </div>
        </header>

    )
}
