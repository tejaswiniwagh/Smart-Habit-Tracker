import React, { useState, forwardRef } from 'react';
import './Auth.css';
import { createHabit } from '../utils/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import enUS from 'date-fns/locale/en-US';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';

registerLocale('en-US', enUS);

const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <div style={{ position: 'relative', width: '100%' }}>
    <FontAwesomeIcon icon={faCalendarDays} className="calendar-icon-left" />
    <input
      type="text"
      className="custom-datepicker-input"
      onClick={onClick}
      ref={ref}
      value={value || ''}
      readOnly
      placeholder="Select start date"
      title="Pick a date"
    />
  </div>
));

const AddHabit = () => {
  const [form, setForm] = useState({
    title: '', emoji: '🔥', type: '', startDate: '',
    target: '', timeOfDay: '', reminder: false,
    category: '', otherCategory: '', note: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.type) newErrors.type = 'Frequency is required';
    if (!form.startDate) newErrors.startDate = 'Start date is required';
    if (!form.target) newErrors.target = 'Target is required';
    if (!form.timeOfDay) newErrors.timeOfDay = 'Time of day is required';
    if (!form.category) newErrors.category = 'Category is required';
    if (form.category === 'Other' && !form.otherCategory.trim()) newErrors.otherCategory = 'Please specify your category';
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const habitData = {
      habit_name: form.title,
      start_date: form.startDate,
      target_days: form.target,
      frequency: form.type,
      time_of_day: form.timeOfDay,
      category: form.category === 'Other' ? form.otherCategory : form.category,
      h_note: form.note,
      reminder: form.reminder
    };

    const token = localStorage.getItem('token');
    if (!token) {
      alert('⚠️ Please login before creating a habit.');
      return;
    }

    try {
      const res = await createHabit(habitData, token);
      alert(`✅ ${res.data.message}`);
    } catch (err) {
      alert('❌ Failed to create habit: ' + (err.response?.data?.error || err.message));
    }
  };

  const inputStyle = field => errors[field] ? { border: '1px solid red' } : {};

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="auth-box">
          <h2>Create New Habit</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-box">
              <input
                type="text"
                name="title"
                placeholder="Habit title (e.g. Read)"
                value={form.title}
                onChange={handleChange}
                style={inputStyle('title')}
              />
              {errors.title && <p className="error-text">{errors.title}</p>}
            </div>

            <div className="input-box">
              <select name="type" value={form.type} onChange={handleChange} style={{ ...inputStyle('type'), width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="" disabled hidden>Frequency</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Custom</option>
              </select>
              {errors.type && <p className="error-text">{errors.type}</p>}
            </div>

            <div className="input-box">
              <DatePicker
                selected={form.startDate ? new Date(form.startDate) : null}
                onChange={date => setForm(prev => ({ ...prev, startDate: date.toISOString().split('T')[0] }))}
                placeholderText="Select start date"
                customInput={<CustomDateInput />}
                calendarClassName="calendar-popup"
                locale="en-US"
                minDate={new Date()}
                maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
              />
              {errors.startDate && <p className="error-text">{errors.startDate}</p>}
            </div>

            <div className="input-box">
              <input
                type="number"
                name="target"
                min="1"
                placeholder="Target days (e.g. 30)"
                value={form.target}
                onChange={handleChange}
                style={inputStyle('target')}
              />
              {errors.target && <p className="error-text">{errors.target}</p>}
            </div>

            <div className="input-box">
              <select name="timeOfDay" value={form.timeOfDay} onChange={handleChange} style={{ ...inputStyle('timeOfDay'), width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="" disabled hidden>Time of Day</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Anytime</option>
              </select>
              {errors.timeOfDay && <p className="error-text">{errors.timeOfDay}</p>}
            </div>

            <div className="input-box">
              <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle('category'), width: '100%', padding: '6px', borderRadius: '12px' }}>
                <option value="" disabled hidden>Category</option>
                <option value="Health">Health</option>
                <option value="Work">Work</option>
                <option value="Learning">Learning</option>
                <option value="Mindfulness">Mindfulness</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="error-text">{errors.category}</p>}
            </div>

            {form.category === 'Other' && (
              <div className="input-box">
                <input
                  type="text"
                  name="otherCategory"
                  placeholder="Enter custom category"
                  value={form.otherCategory}
                  onChange={handleChange}
                  style={inputStyle('otherCategory')}
                />
                {errors.otherCategory && <p className="error-text">{errors.otherCategory}</p>}
              </div>
            )}

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
              <label style={{ color: 'var(--text-color)', fontSize: '1em' }}>Reminder:</label>
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
