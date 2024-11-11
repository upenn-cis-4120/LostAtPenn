import React from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <Hero />
    </div>
  )
}

export default App