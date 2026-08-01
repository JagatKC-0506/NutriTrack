/**
 * EMERGENCY ALERTS CAROUSEL COMPONENT
 * ===================================
 * Auto-sliding section on the home page that cycles through
 * urgent notifications one after another — overdue vaccines,
 * upcoming vaccines, etc.
 */

import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getUserVaccineReminders } from '../api';
import '../styles/EmergencyAlerts.css';

const UPCOMING_DAYS = 14;

export default function EmergencyAlerts({ babyId, navigateTo = '/vaccines' }) {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const fetchAlerts = async () => {
      try {
        const reminders = babyId ? await getUserVaccineReminders(babyId).catch(() => []) : [];
        if (!isMounted) return;

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcomingLimit = new Date(today);
        upcomingLimit.setDate(upcomingLimit.getDate() + UPCOMING_DAYS);

        const urgent = (reminders || [])
          .filter(r => r.status && r.status !== 'completed')
          .map(r => {
            const due = r.reminder_date ? new Date(r.reminder_date) : null;
            const overdue = r.status === 'overdue' || (due && due < today);
            const upcoming = !overdue && due && due >= today && due <= upcomingLimit;
            return { ...r, isOverdue: overdue, isUpcoming: upcoming };
          })
          .filter(r => r.isOverdue || r.isUpcoming)
          .sort((a, b) => {
            if (a.isOverdue !== b.isOverdue) return a.isOverdue ? -1 : 1;
            return new Date(a.reminder_date) - new Date(b.reminder_date);
          });

        setAlerts(urgent);
      } catch (e) {
        console.error('Error fetching emergency alerts:', e);
      }
    };
    fetchAlerts();
    return () => { isMounted = false; };
  }, [babyId]);

  useEffect(() => {
    setIndex(0);
  }, [alerts.length]);

  useEffect(() => {
    if (alerts.length < 2) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % alerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [alerts.length]);

  const current = alerts[index];

  const alertText = useMemo(() => {
    if (!current) return null;
    if (current.isOverdue) {
      return `Overdue · was due ${new Date(current.reminder_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    }
    const daysLeft = Math.ceil((new Date(current.reminder_date) - new Date().setHours(0, 0, 0, 0)) / 86400000);
    return daysLeft <= 1
      ? `Due today`
      : `Due in ${daysLeft} days · ${new Date(current.reminder_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }, [current]);

  if (alerts.length === 0) return null;

  return (
    <div className="ea-section">
      <div className="ea-header">
        <h2>⚠️ Urgent</h2>
        <span className="ea-count">{alerts.length} alert{alerts.length > 1 ? 's' : ''}</span>
      </div>

      <div className="ea-carousel" onClick={() => navigate(navigateTo)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id || index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className={`ea-slide ${current?.isOverdue ? 'ea-overdue' : 'ea-upcoming'}`}
          >
            <span className="ea-icon">💉</span>
            <div className="ea-content">
              <p className="ea-title">{current?.vaccine_name || 'Vaccine'}</p>
              {current?.dose_number != null && (
                <p className="ea-dose">
                  Dose {current.dose_number}{current.total_doses ? ` of ${current.total_doses}` : ''}
                </p>
              )}
              <p className="ea-sub">{alertText}</p>
            </div>
            <span className="ea-badge">{current?.isOverdue ? 'OVERDUE' : 'UPCOMING'}</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {alerts.length > 1 && (
        <div className="ea-dots">
          {alerts.map((a, i) => (
            <button
              key={a.id || i}
              className={`ea-dot ${i === index ? 'ea-dot-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
              aria-label={`Show alert ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
