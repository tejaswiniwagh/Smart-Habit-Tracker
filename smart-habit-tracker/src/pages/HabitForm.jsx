import React, { useState } from 'react';
import './Auth.css';

const AddHabit = () => {
  const [form, setForm] = useState({
    title: '',
    emoji: '🔥',
    type: '',
    startDate: '',
    target: '',
    timeOfDay: '',
    reminder: false,
    category: '',
    note: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert(`🎯 Habit Created: ${form.emoji} ${form.title} (${form.type}) for ${form.target} days`);
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="auth-box">
          <h2>Create New Habit</h2>
          <form onSubmit={handleSubmit}>

            <div className="input-box">
              <input type="text" name="title" placeholder="Habit title (e.g. Read)" required value={form.title} onChange={handleChange} />
            </div>

            {/* <div className="input-box">
              <label style={{ color: 'var(--text-color)', fontSize: '0.85em' }}>Emoji Icon:</label>
              <select name="emoji" value={form.emoji} onChange={handleChange} style={{ width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="🔥">🔥</option>
                <option value="📚">📚</option>
                <option value="💧">💧</option>
                <option value="🎯">🎯</option>
                <option value="🧘">🧘</option>
              </select>
            </div> */}

            <div className="input-box">
              {/* <label style={{ color: 'var(--text-color)', fontSize: '0.85em' }}>Frequency:</label> */}
              <select name="type" value={form.type} onChange={handleChange} style={{ width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="" disabled hidden style={{ color: 'var(--text-color)', opacity: 0.6 }}>Frequency</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="input-box">
              <input type="date" name="startDate" required value={form.startDate} onChange={handleChange} />
            </div>

            <div className="input-box">
              <input type="number" name="target" min="1" placeholder="Target days (e.g. 30)" required value={form.target} onChange={handleChange} />
            </div>

            <div className="input-box">
              {/* <label style={{ color: 'var(--text-color)', fontSize: '0.85em' }}>Time of Day:</label> */}
              <select name="timeOfDay" value={form.timeOfDay} onChange={handleChange} style={{ width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="" disabled hidden style={{ color: 'var(--text-color)', opacity: 0.6 }}>Time of Day</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Anytime</option>
              </select>
            </div>

            <div className="input-box" >
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                style={{ width: '100%', padding: '6px', borderRadius: '12px' }}
              >
                <option value="" disabled hidden style={{ color: 'var(--text-color)', opacity: 0.6 }}>Category</option>
                <option value="Health">Health</option>
                <option value="Work">Work</option>
                <option value="Learning">Learning</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="input-box">
              <textarea
                name="note"
                rows="2"
                placeholder="Why are you building this habit?"
                value={form.note}
                onChange={handleChange}
                style={{ width: '100%', padding: '8px', borderRadius: '12px', fontSize: '0.9em' }}
              />
            </div>

            <div className="input-box" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <label style={{ color: 'var(--text-color)' , fontSize: '1em' }}>Reminder:</label>
              <input type="checkbox" name="reminder" checked={form.reminder} onChange={handleChange} />
            </div>
            
            <button className="btn" type="submit">Start Challenge 🚀</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHabit;
