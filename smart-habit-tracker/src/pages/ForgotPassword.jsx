// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';
import { requestPasswordReset, verifyOtp , resetPassword , resendOTP } from '../utils/api';

const ForgotPassword = () => {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const resetMessages = () => {
    setError('');
    setSuccess('');
  };

  const handleSendOtp = async e => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      await requestPasswordReset(email); // ✅ Uses baseURL
      setStep('otp');
      setSuccess('OTP sent to your email.');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
      setTimeout(() => setSuccess(''), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    resetMessages();
    setLoading(true);

    try {
      await verifyOtp(email, otp);
      setStep('reset');
      setSuccess('OTP verified. Please reset your password.');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    resetMessages();
    setLoading(true);

    try {
      await resendOTP(email); // ✅ Uses baseURL
      setSuccess('OTP resent.');
      setTimeout(() => setSuccess(''), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    resetMessages();
    if (password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError("Passwords don't match");

    setLoading(true);
    try {
      await resetPassword(email, password );
      setSuccess('Password reset successfully. Redirecting...');
      setTimeout(() => setSuccess(''), 2000);
      setTimeout(() => (window.location.href = '/login'), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
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

        <div className="auth-box">
          <h2>Forgot Password</h2>
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="popup success">{success}</div>}

          {step === 'email' && (
            <form onSubmit={handleSendOtp}>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step === 'otp' && (
            <>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  required
                />
              </div>
              <button className="btn" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                 <a
                    href="#"
                    onClick={e => {
                        e.preventDefault();
                        handleResendOtp();
                    }}
                    style={{ color: '#3498db', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                        Resend OTP
                  </a>
                </div>

            </>
          )}

          {step === 'reset' && (
            <div className="popup-modal">
              <h3>Reset Password</h3>
              <div className="input-box">
                <input type="email" value={email} readOnly />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn" onClick={handleResetPassword} disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
