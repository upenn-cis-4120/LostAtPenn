import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from '../components/firebase.js';
import google from '../assets/google.png';
import logo from '../assets/logo.png';

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // To store the logged-in user's data
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    // Firebase listener to check authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      setError('Google Sign-In failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/'); // Navigate to the login page after logout
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
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}
      >
        <div>
          <h1>Hi, {user.displayName || "User"}!</h1>
          <p>Email: {user.email}</p>
          <button
            onClick={handleSignOut}
            className="btn btn-danger"
            style={{
              marginTop: '20px',
              borderRadius: '15px',
              padding: '10px 20px'
            }}
          >
            Sign Out
          </button>
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
              <label style={{ color: '#002D72' }}>Username/Email</label>
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
                backgroundColor: '#8B1818',
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