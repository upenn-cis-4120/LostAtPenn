import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import google from '../assets/google.png';  // Correct path to your image
import logo from '../assets/logo.png';  // Correct path to your image

export default function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '100%', borderRadius: '20px' }}>
        <div className="card-body p-4">
          <div className="text-center mb-4">
            <div 
              className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
              style={{ width: '120px', height: '120px', backgroundColor: '#011F5B' }}
            >
              <img
                src={logo}  // Use the imported logo image
                alt="Logo"
                className="img-fluid"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <h2 className="text-center mb-4" style={{ color: '#002D72' }}>SIGN IN</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{ color: '#002D72' }}>Username/Email</label>
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

            <div className="mb-3">
              <label className="form-label" style={{ color: '#002D72' }}>Password</label>
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

            <div className="text-end mb-3">
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
              className="btn w-100 mb-3"
              style={{ 
                backgroundColor: '#8B1818',
                color: 'white',
                borderRadius: '15px',
                padding: '10px'
              }}
            >
              Sign in
            </button>

            <button
              type="button"
              className="btn btn-light w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
              style={{ 
                borderRadius: '15px',
                padding: '10px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={google}  // Use the imported Google image
                alt="Google"
                className="img-fluid"
                style={{ width: '40px', height: '35px' }}
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
