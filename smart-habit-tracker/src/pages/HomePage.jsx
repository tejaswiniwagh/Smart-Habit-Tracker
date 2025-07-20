// src/pages/HomePage.jsx
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography
} from '@mui/material';
import { motion } from 'framer-motion';
import { Flame, Trophy, BarChart } from 'lucide-react';
import { useState } from 'react';

const BLOGS = [
  {
    title: 'Atomic Habits in 5 mins',
    content:
      'This is a short summary of the bestselling book "Atomic Habits" by James Clear. Focus on identity change, environment design, and tiny consistent improvements.'
  },
  {
    title: '3 Apps That Help',
    content:
      'Top 3 apps for habit tracking: 1) Habitica - gamified experience, 2) Streaks - visual tracking, 3) Smart Habit Tracker - tailored for your goals.'
  },
  {
    title: 'Why Streaks Work',
    content:
      'Streaks work because they tap into the psychological principle of loss aversion — once you start, you don’t want to break the chain.'
  }
];

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBlog, setActiveBlog] = useState(null);

  const handleOpenModal = (blog) => {
    setActiveBlog(blog);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActiveBlog(null);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #3f51b5, #e91e63)',
          borderRadius: 4,
          color: '#fff',
          p: 6,
          textAlign: 'center',
          mb: 10
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Build Habits. Win Streaks. 💪
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
            Track your progress, crush your goals — one habit at a time.
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: '#fff', color: '#e91e63', px: 4, py: 1.5 }}
            href="/register"
          >
            Try Demo
          </Button>
        </motion.div>
      </Box>

      {/* Why Track Habits */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Why Track Habits?
        </Typography>
        <Grid container spacing={4}>
          {[
            { icon: <Flame size={36} />, title: 'Build Streaks' },
            { icon: <Trophy size={36} />, title: 'Stay Motivated' },
            { icon: <BarChart size={36} />, title: 'Track Progress' }
          ].map((item, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <Card elevation={4} sx={{ textAlign: 'center', py: 4 }}>
                <CardContent>
                  <Box sx={{ color: '#e91e63', mb: 1 }}>{item.icon}</Box>
                  <Typography variant="h6" fontWeight="600">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Turn small wins into big victories daily.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* What You'll Get */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          What You'll Get
        </Typography>
        <Grid container spacing={4}>
          {['🔥 7-Day Streak', '🏆 30-Day Challenge', '📊 90% Completion Rate'].map((demo, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Card elevation={3} sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" fontWeight="bold">
                  {demo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visual, motivating & progress-driven
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Calendar Heatmap Preview */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          📅 Daily Habit Tracker Preview
        </Typography>
        <Grid container spacing={1} columns={7}>
          {Array.from({ length: 35 }).map((_, i) => (
            <Grid item xs={1} key={i}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: i % 6 === 0 ? 'green' : '#e0e0e0'
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Quick Motivation Reels */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          🎥 Quick Motivation
        </Typography>
        <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 2 }}>
          {[1, 2].map((id) => (
            <Box
              key={id}
              sx={{
                minWidth: 320,
                height: 180,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 3
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Motivation"
                allowFullScreen
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Habit Tips Blog */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h5" gutterBottom>
          🧠 Build Better Habits
        </Typography>
        <Grid container spacing={3}>
          {BLOGS.map((blog, idx) => (
            <Grid item xs={12} sm={4} key={idx}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6">{blog.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
                  Short tips to build consistency daily.
                </Typography>
                <Button variant="outlined" onClick={() => handleOpenModal(blog)}>
                  Read More
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CTA Footer */}
      <Box
        sx={{
          backgroundColor: '#3f51b5',
          color: '#fff',
          textAlign: 'center',
          py: 8,
          borderRadius: 4
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ready to Start Your Streak?
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Join thousands building better lives one habit at a time.
        </Typography>
        <Button variant="contained" sx={{ px: 5, py: 1.5, fontSize: '1rem' }} href="/register">
          Start Now — It’s Free
        </Button>
      </Box>

      {/* Modal for Blog Read More */}
      <Dialog open={modalOpen} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle>{activeBlog?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {activeBlog?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
