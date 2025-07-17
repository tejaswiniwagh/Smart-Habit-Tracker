import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Switch
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', theme);
    setDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('token'));
    };
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleThemeToggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    const theme = next ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    handleClose();
  };

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          {/* <IconButton edge="start" color="inherit">
            <Wand2 size={24} />
          </IconButton> */}
          <img
            src="..\assets\smart-habit-tracker-logo.png"
            alt="Logo"
            style={{
              height: '45px',
              marginLeft: '12px',
              borderRadius: '8px',
              // background: '#fff',
              padding: '2px'
            }}
          />
         <motion.div
            style={{ flexGrow: 1, 
              fontWeight: 700, 
              fontSize: '1.3rem', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px',
              fontFamily: '"Poppins", sans-serif',
              marginLeft: '12px' // 👈 pushes it closer to the left
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span style={{ color: '#0ef' }}>Smart</span>
            <span style={{ color: darkMode ? '#fff' : '#000' }}>Habit</span>
            <span style={{ color: '#0ef' }}>Tracker</span>
          </motion.div>


          {isLoggedIn ? (
            <>
              <Button color="inherit" component={Link} to="/">Dashboard</Button>
              <Button color="inherit" component={Link} to="/new">Add Habit</Button>
              <Switch checked={darkMode} onChange={handleThemeToggle} />
              <IconButton onClick={handleProfileClick} sx={{ ml: 2 }}>
                <Avatar alt="User" src="https://i.pravatar.cc/40" />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/register">Register</Button>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              {/* <Switch checked={darkMode} onChange={handleThemeToggle} /> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}
