import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHabits, getHabitStats } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import HabitCalendar from '../components/HabitCalendar.jsx';
import { toast } from 'react-toastify';
import './Auth.css';

const emojiFromStreak = (streak) => {
  if (streak >= 10) return '🔥';
  if (streak >= 5) return '😊';
  if (streak > 0) return '🙂';
  return '😵';
};

const HabitPopup = ({ habit, onClose }) => {
  if (!habit) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button onClick={onClose} className="popup-close">✖</button>
        <h2>{habit.habit_name} {emojiFromStreak(habit.streak)}</h2>
        <div className="popup-details">
          <p>📅 Start: {habit.start_date}</p>
          <p>🎯 Target Days: {habit.target_days}</p>
          <p>⏰ Time: {habit.time_of_day}</p>
          <p>🔁 Frequency: {habit.frequency}</p>
          <p>📝 Note: {habit.h_note || 'N/A'}</p>
          <p>🔔 Reminder: {habit.reminder ? 'Yes' : 'No'}</p>
          <p>🔥 Streak: {habit.streak} days</p>
        </div>
        <button className="update-btn">Update Habit</button>
      </div>
    </div>
  );
};

export default function HabitDashboard() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Login required!');
      return navigate('/login');
    }

    const fetchHabits = async () => {
      try {
        const res = await getHabits(token);
        const enriched = await Promise.all(
          res.data.map(async (habit) => {
            try {
              const stats = await getHabitStats(habit.id);
              return { ...habit, streak: stats.streak, completionDates: stats.dates || [] };
            } catch {
              return { ...habit, streak: 0, completionDates: [] };
            }
          })
        );
        setHabits(enriched);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };

    fetchHabits();
  }, [navigate]);

  const allDates = habits.flatMap(h => h.completionDates || []);

  return (
    <motion.div
      className="habit-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="habit-heading">🌿 Your Smart Habit Dashboard</h1>

      {habits.length === 0 ? (
        <div className="no-habits-message">
          <h2>😎 No habits yet!</h2>
          <p>Start your habit journey today 💪🌱</p>
        </div>
      ) : (
        <div className="habit-grid">
          <AnimatePresence>
            {habits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="habit-card"
                onClick={() => setSelectedHabit(habit)}
              >
                <div className="card-title">
                  {habit.habit_name} {emojiFromStreak(habit.streak)}
                </div>
                <div className="card-category">#{habit.category}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <HabitPopup habit={selectedHabit} onClose={() => setSelectedHabit(null)} />
      <HabitCalendar completionDates={allDates} />
    </motion.div>
  );
}