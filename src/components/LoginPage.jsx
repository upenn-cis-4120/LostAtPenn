import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import google from '../assets/google.png'; // Correct path to your image
import logo from '../assets/logo.png'; // Correct path to your image

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission or authentication
    const isAuthenticated = true; // Replace with actual authentication logic
    if (isAuthenticated) {
      navigate('/'); // Navigate to the home page
    } else {
      alert('Invalid login credentials'); // Display error for invalid credentials
    }
  };

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
      <div className="panel panel-default shadow" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <div className="panel-body" style={{ padding: '20px' }}>
          <div className="text-center mb-4">
            <div 
              className="img-circle center-block mb-3"
              style={{ width: '120px', height: '120px', backgroundColor: '#011F5B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <img
                src={logo} // Use the imported logo image
                alt="Logo"
                className="img-responsive"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <h2 className="text-center mb-4" style={{ color: '#002D72' }}>SIGN IN</h2>
          </div>

          <form onSubmit={handleSubmit}>
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

            <button
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
                src={google} // Use the imported Google image
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
          </form>
        </div>
      </div>
    </div>
  );
}