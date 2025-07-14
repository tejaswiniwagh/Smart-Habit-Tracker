import React, { useState } from 'react';
import './Auth.css';

const Register = () => {
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
    nickname: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSendOTP = () => {
    if (!formData.email) return alert("Email is required.");
    setShowOTP(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    alert("Registration submitted.");
  };

  return (
    <div className="page-wrapper">
    <div className="container">
      {[...Array(50)].map((_, i) => (
        <span key={i} style={{ '--i': i }} />
      ))}
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
            {/* <label>Name</label> */}
          </div>
          <div className="input-box">
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
            {/* <label>Email</label> */}
          </div>
          {!showOTP && (
            <div className="forgot-password">
              <a href="#" onClick={e => { e.preventDefault(); handleSendOTP(); }}>Send OTP</a>
            </div>
          )}
          {showOTP && (
            <div className="input-box">
              <input type="text" name="otp" placeholder="OTP" required value={formData.otp} onChange={handleChange} />
              {/* <label>OTP</label> */}

            </div>
          )}
          <div className="input-box">
            <input type="password" name="password" placeholder="Password" required value={formData.password} onChange={handleChange} />
            {/* <label>Password</label> */}
          </div>
          <div className="input-box">
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required value={formData.confirmPassword} onChange={handleChange} />
            {/* <label>Confirm Password</label> */}
          </div>
          <button className="btn" type="submit">Register</button>
          <div className="signup-link">
            <a href="/login">Already have an account? Login</a>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Register;
