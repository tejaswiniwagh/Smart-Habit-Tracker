// src/components/HabitCalendar.jsx
import React, { useState } from 'react';
import './HabitCalendar.css';
import { motion } from 'framer-motion';

const HabitCalendar = ({ completionDates = [], onMarkComplete }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const isToday = (d) =>
    d === today.getDate() &&
    year === today.getFullYear() &&
    month === today.getMonth();

  const isCompleted = (d) =>
    completionDates.some((dateStr) => {
      const date = new Date(dateStr);
      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === d
      );
    });

  const renderDay = (d) => {
    const date = new Date(year, month, d);
    const past = date < new Date(new Date().setHours(0, 0, 0, 0));
    const completed = isCompleted(d);

    return (
      <motion.div
        key={d}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className={`calendar-day ${past ? 'disabled' : ''} ${
          completed ? 'completed' : ''
        } ${isToday(d) ? 'today' : ''}`}
        onClick={() => {
          if (isToday(d) && onMarkComplete) onMarkComplete();
        }}
      >
        {d}
      </motion.div>
    );
  };

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(<div key={`e${i}`} />);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(renderDay(d));

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth}>⬅️</button>
        <h3 className="calendar-month">
          📅 {currentDate.toLocaleString('default', { month: 'long' })} {year}
        </h3>
        <button onClick={nextMonth}>➡️</button>
      </div>
      <div className="calendar-grid">{calendarDays}</div>
    </div>
  );
};

export default HabitCalendar;
