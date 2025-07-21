// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { sendOTP, registerUser } from '../utils/api';

const Register = () => {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    otp: '',
    password: '',
    confirmPassword: ''
  });

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(formData.email)) {
      errs.email = 'Invalid email';
    }
    if (!passRegex.test(formData.password)) {
      errs.password = 'Weak password';
    }
    if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSendOTP = async () => {
    if (!formData.email) return alert("Email is required.");
    try {
      await sendOTP(formData.email);
      setShowOTP(true);
      setOtpSent(true);
    } catch (err) {
      setOtpSent(false);
      alert("OTP failed: " + (err?.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');
    if (!validate()) return;

    const { confirmPassword, ...submitData } = formData;

    try {
      await registerUser(submitData);
      setSuccessMsg('✅ Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const message = err?.response?.data?.message || err.message;
      setErrorMsg('❌ Registration failed: ' + message);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        {[...Array(50)].map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
        <div className="auth-box">
          <h2>Register</h2>
          {successMsg && <div className="msg success">{successMsg}</div>}
          {errorMsg && <div className="msg error">{errorMsg}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={errors.email ? 'invalid' : ''}
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small className="error-text" style={{ color: 'red' }}>{errors.email}</small>}
            </div>
            {!showOTP && (
              <div className="forgot-password">
                <button
                  type="button"
                  onClick={handleSendOTP}
                  className="link-button"
                  style={{ background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', padding: 0 }}
                >
                  Send OTP
                </button>
                {otpSent && <span style={{ color: 'lime', marginLeft: '10px' }}>OTP sent ✅</span>}
              </div>
            )}
            {showOTP && (
              <div className="input-box">
                <input type="text" name="otp" placeholder="OTP" required value={formData.otp} onChange={handleChange} />
              </div>
            )}
            <div className="input-box">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                className={errors.password ? 'invalid' : ''}
                onChange={handleChange}
              />
              {errors.password && <small className="error-text" style={{ color: 'red' }}>{errors.password}</small>}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                className={errors.confirmPassword ? 'invalid' : ''}
                onChange={handleChange}
              />
              {errors.confirmPassword && <small className="error-text" style={{ color: 'red' }}>{errors.confirmPassword}</small>}
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
