import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './components/firebase'; // Import Firebase auth
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import Chat from './components/Chat';
import UploadPage from './components/UploadPage';

const App = () => {
  const [showMiffyCard, setShowMiffyCard] = useState(false);
  const [user, setUser] = useState(null); // Store the authenticated user
  const [loading, setLoading] = useState(true); // Track loading state for auth

  const handleFormSubmit = () => {
    setShowMiffyCard(true);
  };

  useEffect(() => {
    // Firebase listener to check authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading when auth state is determined
    });
    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading spinner or message
  }

  return (
    <Router>
      <div className="flex flex-col">
        {user && <Navbar />} {/* Show Navbar only if the user is authenticated */}
        <Routes>
          {/* Allow access to all routes, including LoginPage */}
          <Route path="/" element={user ? <Hero showMiffyCard={showMiffyCard} /> : <Navigate to="/login" replace />} />
          <Route path="/chat" element={user ? <Chat selectedUserId={1} /> : <Navigate to="/login" replace />} />
          <Route path="/upload" element={user ? <UploadPage onSubmit={handleFormSubmit} /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} /> {/* LoginPage is accessible to everyone */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;