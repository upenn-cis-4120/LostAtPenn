import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from '../components/firebase.js';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../components/firebase.js';
import google from '../assets/google.png';
import logo from '../assets/logo.svg';
import { User } from 'lucide-react';
import Cards from './Cards';

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [userCards, setUserCards] = useState([]);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        fetchUserCards(currentUser.email);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchUserCards = (email) => {
    const cardsRef = ref(database, 'cards');

    onValue(cardsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userSpecificCards = Object.entries(data)
          .map(([key, value]) => ({ id: key, ...value }))
          .filter((card) => card.email === email);

        setUserCards(userSpecificCards);
      }
    });
  };

  const handleDeleteCard = async (cardId) => {
    try {
      const cardRef = ref(database, `cards/${cardId}`);
      await remove(cardRef);
      setUserCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error.message);
      alert("Failed to delete the report. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    
    // Check if email ends with upenn.edu
    if (!formData.email.toLowerCase().endsWith('@upenn.edu')) {
      setError('Must use upenn.edu email');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // Check if the Google email ends with upenn.edu
      if (!result.user.email.toLowerCase().endsWith('@upenn.edu')) {
        await auth.signOut(); // Sign out the user if not a Penn email
        setError('Must use upenn.edu email');
        return;
      }
      navigate('/');
    } catch (error) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  if (user) {
    return (
      <div
        className="container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center',
          padding: '20px',
        }}
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: '#011F5B',
            marginBottom: '20px',
          }}
        >
          <User size={80} fill="white" stroke="none" />
        </div>

        <h1 style={{ fontSize: '3rem' }}>
          Hi, {user.displayName || "User"}!
        </h1>
        <p style={{ fontSize: '1.75rem', color: '#666' }}>
          Email: {user.email}
        </p>
        <button
          onClick={handleSignOut}
          className="btn"
          style={{
            marginTop: '10px',
            borderRadius: '15px',
            padding: '10px 20px',
            backgroundColor: '#8C1A11',
            color: 'white',
            border: 'none',
          }}
        >
          Sign Out
        </button>

        <div className="mt-5" style={{ width: '100%' }}>
          <h2
            className="mb-4"
            style={{
              marginTop: '20px',
              fontSize: '2.5rem',
              textAlign: 'center',
            }}
          >
            My Reports
          </h2>
          <div
            className="d-flex flex-wrap"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {userCards.length > 0 ? (
              userCards.map((card) => (
                <div key={card.id} style={{ textAlign: 'center' }}>
                  <Cards
                    status={card.status}
                    item={card.item}
                    when={card.when}
                    where={card.where}
                    photo={card.photo}
                    comments={card.comments}
                    category={card.category}
                    email={card.email}
                  />
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="btn btn-danger mt-2"
                    style={{
                      borderRadius: '15px',
                      backgroundColor: '#8C1A11',
                      padding: '5px 15px',
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p style={{ color: '#666' }}>No reports found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <div
        className="panel panel-default shadow"
        style={{
          maxWidth: '400px',
          width: '100%',
          borderRadius: '20px'
        }}
      >
        <div className="panel-body" style={{ padding: '20px' }}>
          <div className="text-center mb-4">
            <div
              className="img-circle center-block mb-3"
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#011F5B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={logo}
                alt="Logo"
                className="img-responsive"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <h2 className="text-center mb-4" style={{ color: '#002D72' }}>
              SIGN IN
            </h2>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleEmailSignIn}>
            <div className="form-group">
              <label style={{ color: '#002D72' }}>Penn Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{
                  borderRadius: '15px',
                  padding: '10px 15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: '#002D72' }}>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                style={{
                  borderRadius: '15px',
                  padding: '10px 15px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              />
            </div>

            <div className="text-right mb-3">
              <a
                href="#"
                className="text-decoration-none"
                style={{ color: '#002D72' }}
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-block"
              style={{
                backgroundColor: '#8C1A11',
                color: 'white',
                borderRadius: '15px',
                padding: '10px',
                marginBottom: '15px'
              }}
            >
              Sign in
            </button>
          </form>

          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="btn btn-default btn-block"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '15px',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              marginBottom: '15px'
            }}
          >
            <img
              src={google}
              alt="Google"
              className="img-responsive"
              style={{ width: '20px', height: '20px', marginRight: '10px' }}
            />
            Sign in with Google
          </button>

          <div className="text-center">
            <a
              href="#"
              className="text-decoration-none"
              style={{ color: '#002D72' }}
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}