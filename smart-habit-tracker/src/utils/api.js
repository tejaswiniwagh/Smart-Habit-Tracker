import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL ,
  withCredentials: true
});

// ✅ These MUST start with /api/auth to match backend routes

export const sendOTP = (email) =>
  API.post('/auth/send-otp', { email });

export const registerUser = (formData) =>
  API.post('/auth/register', formData);

export const loginUser = (data) =>
  API.post('/auth/login', data);

export const createHabit = (habitData, token) =>
  API.post('/habits', habitData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const requestPasswordReset = (email) =>
  API.post('/auth/forgot-password', { email });

export const verifyOtp = (email, otp) =>
  API.post('/auth/verify-otp', { email, otp });

export const resetPassword = (email, newPassword) =>
  API.post('/auth/reset-password', { email, newassword });

export const resendOTP = (email) =>
  API.post('/auth/forgot-password', { email });