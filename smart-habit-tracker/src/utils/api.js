// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL ,
//   withCredentials: true
// });

// // ✅ These MUST start with /api/auth to match backend routes

// export const sendOTP = (email) =>
//   API.post('/auth/send-otp', { email });

// export const registerUser = (formData) =>
//   API.post('/auth/register', formData);

// export const loginUser = (data) =>
//   API.post('/auth/login', data);

// export const createHabit = (habitData, token) =>
//   API.post('/habits', habitData, {
//     headers: { Authorization: `Bearer ${token}` },
//   });

import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
});

// 🔐 Attach token to all requests automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ✅ Auth APIs
export const sendOTP = (email) => API.post('/auth/send-otp', { email });
export const registerUser = (formData) => API.post('/auth/register', formData);
export const loginUser = (data) => API.post('/auth/login', data);

// ✅ Habit APIs
export const createHabit = (habitData) => API.post('/habits', habitData);
export const getHabits = () => API.get('/habits');
export const getHabitStats = (id) => API.get(`/habits/${id}/stats`);
export const trackHabit = (id) => API.post(`/habits/${id}/track`);
export const updateHabit = (id, data) => API.put(`/habits/${id}`, data);
export const deleteHabit = (id) => API.delete(`/habits/${id}`);
