// src/components/HabitFilter.jsx
import React from 'react';
import './HabitCalendar.css';

export default function HabitFilter({ selected, onChange, categories }) {
  return (
    <div className="habit-filter">
      <label htmlFor="category-select">Filter by category:</label>
      <select
        id="category-select"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
