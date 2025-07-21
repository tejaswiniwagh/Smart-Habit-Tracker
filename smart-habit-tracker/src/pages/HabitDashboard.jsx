// ✅ Auto-track habit for today (only once per habit) and show visit calendar
// src/pages/HabitDashboard.jsx

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getHabits,
  getTrackedDates,
  trackHabit,
  trackUserVisit,
  getUserVisits
} from '../utils/api';
import { useNavigate } from 'react-router-dom';
import HabitCalendar from '../components/HabitCalendar.jsx';
import HabitFilter from '../components/HabitFilter.jsx';
import { toast } from 'react-toastify';
import { FaCalendarAlt } from 'react-icons/fa';
import './Auth.css';

const emojiFromStreak = (streak) => {
  if (streak >= 10) return '🔥';
  if (streak >= 5) return '😊';
  if (streak > 0) return '🙂';
  return '😵';
};

const HabitPopup = ({ habit, onClose }) => {
  if (!habit) return null;
  const progress = Math.max(0, Math.min(100, Math.round((habit.streak / habit.target_days) * 100))) || 0;

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
        <div className="progress-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
            style={{ background: '#4caf50', height: '8px', borderRadius: '4px', marginTop: '8px' }}
          />
          <small>{progress}% complete ({habit.streak}/{habit.target_days})</small>
        </div>
        <button className="update-btn">Update Habit</button>
      </div>
    </div>
  );
};

export default function HabitDashboard() {
  const [habits, setHabits] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [visitDates, setVisitDates] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [calendarHabitId, setCalendarHabitId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (!token) {
      toast.warning('Login required!');
      return navigate('/login');
    }

    const today = new Date().toISOString().split('T')[0];

    const trackVisitOncePerDay = async () => {
      const lastVisit = localStorage.getItem('last_visit');

      if (user_id && lastVisit !== today) {
        try {
          await trackUserVisit({ user_id });
          localStorage.setItem('last_visit', today);
        } catch (err) {
          console.error('Visit track error:', err);
        }
      }
    };

    const fetchHabitsAndVisits = async () => {
      try {
        const habitRes = await getHabits(token);

        const enriched = await Promise.all(
          habitRes.data.map(async (habit) => {
            try {
              const tracked = await getTrackedDates(habit.id);
              const dates = tracked.data.map(item => item.tracking_date);

              const alreadyTracked = dates.includes(today);
              if (!alreadyTracked) {
                await trackHabit(habit.id);
                dates.push(today);
                if (calendarHabitId === habit.id) {
                  toast.success(`✅ ${habit.habit_name} auto-tracked for today.`);
                }
              }

              return {
                ...habit,
                streak: dates.length,
                completionDates: dates
              };
            } catch {
              return { ...habit, streak: 0, completionDates: [] };
            }
          })
        );
        setHabits(enriched);

        if (user_id) {
          const visitRes = await getUserVisits(user_id);
          const visits = visitRes.data.map(v => v.start || v.visit_date);
          setVisitDates(visits);
        }
      } catch (err) {
        console.error('Dashboard load error:', err);
        toast.error('Failed to load dashboard');
      }
    };

    trackVisitOncePerDay();
    fetchHabitsAndVisits();
  }, [navigate, calendarHabitId]);

  const categories = [...new Set(habits.map(h => h.category).filter(Boolean))];
  const visibleHabits = filterCategory ? habits.filter(h => h.category === filterCategory) : habits;

  return (
    <motion.div
      className="habit-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="habit-heading">🌿 Your Smart Habit Dashboard</h1>

      <HabitFilter selected={filterCategory} onChange={setFilterCategory} categories={categories} />

      {visibleHabits.length === 0 ? (
        <div className="no-habits-message">
          <h2>😎 No habits yet!</h2>
          <p>Start your habit journey today 💪🌱</p>
        </div>
      ) : (
        <div className="habit-grid">
          <AnimatePresence>
            {visibleHabits.map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className="habit-card"
              >
                <div onClick={() => setSelectedHabit(habit)} className="card-title">
                  {habit.habit_name} {emojiFromStreak(habit.streak)}
                </div>
                <div className="card-category">#{habit.category}</div>
                <FaCalendarAlt className="calendar-icon" onClick={() => setCalendarHabitId(habit.id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <HabitPopup habit={selectedHabit} onClose={() => setSelectedHabit(null)} />

      {calendarHabitId && (
        <div className="calendar-wrapper">
          <HabitCalendar
            completionDates={(habits.find(h => h.id === calendarHabitId)?.completionDates) || []}
            visitDates={visitDates}
            onMarkComplete={null}
          />
        </div>
      )}
    </motion.div>
  );
}
