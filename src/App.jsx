import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Chat from './components/Chat';
import UploadPage from './components/UploadPage';

const App = () => {
  const [showMiffyCard, setShowMiffyCard] = useState(false);

  const handleFormSubmit = () => {
    setShowMiffyCard(true);
  };

  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero showMiffyCard={showMiffyCard} />} />
          <Route path="/chat" element={<Chat selectedUserId={1} />} /> {/* Pass Jiming Choi's ID */}
          <Route path="/upload" element={<UploadPage onSubmit={handleFormSubmit} />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
