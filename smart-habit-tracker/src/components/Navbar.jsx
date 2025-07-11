// File: src/components/Navbar.jsx
import React, { useState, useMemo } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Switch,
  Avatar,
  Menu,
  MenuItem,
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#636B2F'
      },
      background: {
        default: darkMode ? '#121212' : '#f4f4f4',
        paper: darkMode ? '#1e1e1e' : '#ffffff'
      },
      text: {
        primary: darkMode ? '#fff' : '#000',
        secondary: darkMode ? '#bbb' : '#555'
      }
    }
  }), [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(prev => !prev);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton edge="start" color="inherit">
              <Wand2 size={24} />
            </IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Smart Habit Tracker
            </Typography>
            <Button color="inherit" component={Link} to="/">Dashboard</Button>
            <Button color="inherit" component={Link} to="/new">Add Habit</Button>
            <Switch checked={darkMode} onChange={handleThemeToggle} />
            <IconButton onClick={handleProfileClick} sx={{ ml: 2 }}>
              <Avatar alt="User" src="https://i.pravatar.cc/40" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </motion.div>
    </ThemeProvider>
  );
}
