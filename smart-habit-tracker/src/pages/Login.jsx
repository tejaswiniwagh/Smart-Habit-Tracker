import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert(`Login with Email: ${formData.email}`);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {[...Array(50)].map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
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
            <button className="btn" type="submit">Login</button>
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
