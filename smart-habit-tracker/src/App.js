import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HabitForm from './pages/HabitForm';
import HabitTracker from './pages/HabitTracker';
import Register from './pages/Register';
import Login from './pages/Login';
import HabitDashboard from './pages/HabitDashboard';
import ForgotPassword from './pages/ForgotPassword';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/habit-dashboard" element={<HabitDashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/new" element={<HabitForm />} />
          <Route path="/habit/:id" element={<HabitTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
