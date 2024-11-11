import React from 'react'
import { Search, MessageCircle, User } from 'lucide-react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'tailwindcss/tailwind.css' // Make sure Tailwind CSS is imported
import '@fontsource/poppins' // Import the Poppins font

const Navbar = () => {
  return (
    <header 
      className="w-full py-4 px-6 border-b flex items-center justify-between shadow-lg" 
      style={{ backgroundColor: '#F5F5F5', fontFamily: 'Poppins, sans-serif' }}
    >
      <button 
        className="text-5xl font-black text-left focus:outline-none hover:scale-105 transition-transform duration-200" 
        style={{ color: '#011F5B', fontFamily: 'Poppins, sans-serif' }}
        onClick={() => window.location.href = '/'} // Change this as needed
      >
        LOST@PENN
      </button>
      <div className="flex items-center gap-5 ml-auto">
        <button className="p-3 hover:scale-110 transition-transform duration-200" style={{ color: '#011F5B' }}>
          <Search size={30} strokeWidth={2} />
        </button>
        <button 
          className="px-6 py-3 text-2xl font-bold border-2 border-[#8C1A11] text-[#8C1A11] rounded-full hover:bg-[#8C1A11] hover:text-white transition-colors duration-200 shadow-sm"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          Report
        </button>
        <button className="p-3 hover:scale-110 transition-transform duration-200" style={{ color: '#011F5B' }}>
          <MessageCircle size={30} strokeWidth={2} />
        </button>
        <button className="p-3 hover:scale-110 transition-transform duration-200">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#011F5B' }}>
            <User size={30} fill="white" stroke="none" />
          </div>
        </button>
      </div>
    </header>
  )
}

export default Navbar