import React, { useState } from 'react';
import { Container, TextField, MenuItem, Button, Typography } from '@mui/material';
import api from '../utils/api';

export default function HabitForm() {
  const [name, setName] = useState('');
  const [type, setType] = useState('daily');
  const [goal, setGoal] = useState(30);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/habits', {
        user_id: 1,               // hardcoded user for now
        name,
        type,
        goal_duration: goal
      });
      alert('✅ Habit created!');
      console.log('Response:', res.data);
    } catch (err) {
      console.error('Error creating habit:', err);
      alert('❌ Failed to create habit.');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Add New Habit</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Habit Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
        <TextField
          select
          label="Habit Type"
          fullWidth
          margin="normal"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
        </TextField>
        <TextField
          label="Goal Duration (days)"
          type="number"
          fullWidth
          margin="normal"
          value={goal}
          onChange={e => setGoal(Number(e.target.value))}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Create Habit</Button>
      </form>
    </Container>
  );
}
