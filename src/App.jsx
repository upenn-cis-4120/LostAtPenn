import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Chat from './components/Chat' // Import Chat component

const App = () => {
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} /> {/* Default route for Hero */}
          <Route path="/chat" element={<Chat />} /> {/* Route for Chat component */}
        </Routes>
      </div>
    </Router>
  )
}

export default App