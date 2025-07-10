import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';
import Navbar from './components/Navbar';


function App() {
  return (
   <Router>
      <Navbar />
      <div style={{ padding: '2rem' }}>
        <h2>Welcome to Smart Habit Tracker</h2>
        <p>Select a route from the navbar to get started.</p>
      </div>
    </Router>
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  );
}

export default App;
