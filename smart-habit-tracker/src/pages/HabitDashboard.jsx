// src/pages/HabitDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import { getHabits, getHabitStats } from '../utils/api';

const emojiFromStreak = (streak) => {
  if (streak >= 7) return '🔥';
  if (streak >= 3) return '😎';
  if (streak === 0) return '🐥';
  return '🧊';
};

export default function HabitDashboard() {
  const [habits, setHabits] = useState([]);
  const [activeHabit, setActiveHabit] = useState(null);
  const [streak, setStreak] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const res = await getHabits();
        setHabits(res.data);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };

    fetchHabits();
  }, []);

  const handleSelectHabit = async (habit) => {
    try {
      const res = await getHabitStats(habit.id);
      setActiveHabit(habit);
      setStreak(res.data.streak);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const renderStatus = (streak) => {
    const emoji = emojiFromStreak(streak);
    const status =
      streak >= 7 ? 'Hot Streak!' :
      streak >= 3 ? 'Going Strong' :
      streak === 0 ? 'Getting Started' :
      'Cooling Off';
    return `${emoji} ${status}`;
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            onClick={() => handleSelectHabit(habit)}
            className="flex flex-col items-start gap-1 hover:bg-blue-100 dark:hover:bg-gray-800"
          >
            <div className="text-lg font-semibold">{habit.habit_name}</div>
            <div className="text-sm text-gray-500">{habit.category}</div>
          </Card>
        ))}

        {activeHabit && (
          <div className="md:col-span-3 mt-6">
            <Card className="p-6 bg-white dark:bg-gray-800">
              <div className="text-xl font-semibold mb-2">
                {activeHabit.habit_name} {renderStatus(streak)}
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
                <div>Start: {activeHabit.start_date}</div>
                <div>Target: {activeHabit.target_days} days</div>
                <div>Frequency: {activeHabit.frequency}</div>
                <div>Time: {activeHabit.time_of_day}</div>
                <div>Reminder: {activeHabit.reminder}</div>
                <div>Category: {activeHabit.category}</div>
              </div>

              <div className="mt-4">
                <div className="text-gray-600 dark:text-gray-400 italic">"{activeHabit.h_note}"</div>
              </div>

              {streak < 2 && (
                <div className="mt-4">
                  <Button onClick={() => navigate(`/update/${activeHabit.id}`)}>
                    ✏️ Update Habit
                  </Button>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
