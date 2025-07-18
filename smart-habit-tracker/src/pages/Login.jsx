// src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { loginUser} from '../utils/api';


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // success state

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // const response = await axios.post('http://localhost:5000/auth/login', formData);
      const response = await loginUser(formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('JWT Token:', token); // Log token

      setSuccess(true); // Show popup

      setTimeout(() => {
        setSuccess(false);
        window.location.href = '/new'; // Navigate after 5s
      }, 5000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {[...Array(50)].map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}

        {success && (
          <div className="popup success">
            Login successful! 
          </div>
        )}

        <div className="auth-box">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="error-msg">{error}</div>}

            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>

           <div className="forgot-password-link" style={{ textAlign: 'center', marginTop: '12px' }}>
              <a href="/forgot-password">Forgot Password?</a>
            </div>

            <div className="signup-link">
              <a href="/register">Don't have an account? Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
