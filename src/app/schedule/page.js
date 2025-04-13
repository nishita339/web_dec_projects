"use client";

import { useState, useEffect } from 'react';

const styles = {
  container: {
    maxWidth: '700px',
    margin: '50px auto',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  heading: {
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontWeight: '700',
  },
  form: {
    display: 'grid',
    gap: '20px',
    marginBottom: '30px',
    gridTemplateColumns: '1fr', // Single column for smaller screens
    '@media (min-width: 600px)': {
      gridTemplateColumns: '120px 1fr', // Two columns for larger screens
      alignItems: 'center',
    },
  },
  label: {
    fontWeight: '600',
    color: '#34495e',
    textAlign: 'left',
  },
  input: {
    padding: '12px',
    border: '1px solid #bdc3c7',
    borderRadius: '6px',
    fontSize: '1em',
    color: '#333',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#3498db',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2980b9',
    },
    // Ensure button spans full width in single-column layout
    gridColumn: '1 / -1',
    '@media (min-width: 600px)': {
      gridColumn: '2 / 3', // Span only the second column on larger screens
    },
  },
  message: {
    marginTop: '25px',
    fontWeight: '500',
    color: '#27ae60',
    backgroundColor: '#e6f9e9',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #c3e6cb',
  },
  error: {
    marginTop: '25px',
    fontWeight: '500',
    color: '#c0392b',
    backgroundColor: '#fdecea',
    padding: '15px',
    borderRadius: '6px',
    border: '1px solid #e74c3c',
  },
  scheduleListContainer: {
    marginTop: '40px',
    borderTop: '2px solid #eee',
    paddingTop: '30px',
    textAlign: 'left',
  },
  scheduleListHeading: {
    color: '#34495e',
    marginBottom: '15px',
    fontSize: '1.5em',
    fontWeight: '600',
  },
  scheduleItem: {
    padding: '15px 0',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleInfo: {
    flexGrow: 1,
  },
  cronText: {
    fontWeight: '500',
    color: '#777',
  },
  greetingText: {
    color: '#555',
    fontSize: '0.95em',
  },
  scheduleActions: {
    marginLeft: '20px',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '0.9em',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
      backgroundColor: '#e74c3c',
      color: '#fff',
    },
  },
  noSchedules: {
    color: '#777',
    fontStyle: 'italic',
  },
};

// Mock functions (replace with your actual API calls)
async function fetchSchedules() {
  return [
    { id: 1, cron: '0 9 * * *', message: 'Good morning from Kota!' },
    { id: 2, cron: '0 18 * * *', message: 'Good evening from Kota!' },
    { id: 3, cron: '*/30 * * * *', message: 'A gentle reminder from Kota.' },
  ];
}

async function deleteSchedule(id) {
  console.log(`Deleting schedule with ID: ${id}`);
  return true; // Indicate success
}

export default function SchedulePage() {
  const [scheduleTime, setScheduleTime] = useState('');
  const [customGreeting, setCustomGreeting] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const loadSchedules = async () => {
      const fetchedSchedules = await fetchSchedules();
      setSchedules(fetchedSchedules);
    };

    loadSchedules();
  }, []);

  const handleSchedule = async () => {
    setMessage('');
    setError('');

    if (!scheduleTime) {
      setError('Schedule time is required.');
      return;
    }

    const response = await fetch('/api/schedule-greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scheduleTime, customGreeting }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage(data.message);
      setScheduleTime('');
      setCustomGreeting('');
      // Consider refetching schedules here
    } else {
      setError(data.error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    const success = await deleteSchedule(id);
    if (success) {
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
      setMessage('Schedule deleted successfully.');
      setError('');
    } else {
      setError('Failed to delete schedule.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Schedule Your Greetings</h1>

      <form style={styles.form} onSubmit={(e) => { e.preventDefault(); handleSchedule(); }}>
        <label htmlFor="scheduleTime" style={styles.label}>
          Cron Schedule:
        </label>
        <input
          type="text"
          id="scheduleTime"
          style={styles.input}
          placeholder="e.g., '0 9 * * *'"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />

        <label htmlFor="customGreeting" style={styles.label}>
          Custom Greeting (Optional):
        </label>
        <input
          type="text"
          id="customGreeting"
          style={styles.input}
          placeholder="Personalize your message"
          value={customGreeting}
          onChange={(e) => setCustomGreeting(e.target.value)}
        />

        <button type="submit" style={styles.button}>
          Schedule It!
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.scheduleListContainer}>
        <h2 style={styles.scheduleListHeading}>Upcoming Greetings</h2>
        {schedules.length > 0 ? (
          <ul>
            {schedules.map((schedule) => (
              <li key={schedule.id} style={styles.scheduleItem}>
                <div style={styles.scheduleInfo}>
                  <p style={styles.cronText}>Cron: {schedule.cron}</p>
                  <p style={styles.greetingText}>Message: "{schedule.message}"</p>
                </div>
                <div style={styles.scheduleActions}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteSchedule(schedule.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noSchedules}>No greetings scheduled yet.</p>
        )}
      </div>
    </div>
  );
}