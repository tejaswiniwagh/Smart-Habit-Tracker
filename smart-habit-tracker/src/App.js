import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HabitForm from './pages/HabitForm';
import Dashboard from './pages/Dashboard';
import HabitTracker from './pages/HabitTracker';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/new" element={<HabitForm />} />
          <Route path="/habit/:id" element={<HabitTracker />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
