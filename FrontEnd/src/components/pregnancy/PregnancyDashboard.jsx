import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Baby, Heart } from 'lucide-react';

const DAY_MS = 24 * 60 * 60 * 1000;

function calculatePregnancyInfo(dueDateString) {
  if (!dueDateString) {
    return { weeksPregnant: 0, trimester: 'Set your due date', progress: 0, daysRemaining: 280, dueDate: null };
  }

  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) {
    return { weeksPregnant: 0, trimester: 'Invalid due date', progress: 0, daysRemaining: 280, dueDate: null };
  }

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const estimatedLmp = new Date(dueDate.getTime() - 280 * DAY_MS);
  const normalizedLmp = new Date(estimatedLmp.getFullYear(), estimatedLmp.getMonth(), estimatedLmp.getDate());

  const daysPregnant = Math.floor((normalizedToday - normalizedLmp) / DAY_MS);
  const weeksPregnant = Math.max(0, Math.min(40, Math.floor(daysPregnant / 7)));
  const daysRemaining = Math.max(0, Math.floor((dueDate - normalizedToday) / DAY_MS));
  const progress = Math.min(100, Math.round((weeksPregnant / 40) * 100));

  let trimester;
  if (weeksPregnant < 13) trimester = 'First Trimester';
  else if (weeksPregnant < 28) trimester = 'Second Trimester';
  else trimester = 'Third Trimester';

  if (daysPregnant < 0) {
    return { weeksPregnant: 0, trimester: 'Before Pregnancy', progress: 0, daysRemaining: 280, dueDate };
  }

  return { weeksPregnant, trimester, progress, daysRemaining, dueDate };
}

function formatDate(date) {
  if (!date) return 'Not set';
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function PregnancyDashboard({ dueDate }) {
  const info = useMemo(() => calculatePregnancyInfo(dueDate), [dueDate]);

  return (
    <motion.div
      className="pregnancy-dashboard-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pregnancy-dashboard-header">
        <div className="pregnancy-dashboard-title-row">
          <Baby className="pregnancy-dashboard-icon" size={24} />
          <h2>Your Pregnancy</h2>
        </div>
        <span className="pregnancy-dashboard-trimester-badge">{info.trimester}</span>
      </div>

      <div className="pregnancy-dashboard-week-display">
        <span className="pregnancy-dashboard-week-number">{info.weeksPregnant}</span>
        <span className="pregnancy-dashboard-week-label">of 40 weeks</span>
      </div>

      <div className="pregnancy-dashboard-progress-section">
        <div className="pregnancy-dashboard-progress-bar">
          <motion.div
            className="pregnancy-dashboard-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${info.progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <span className="pregnancy-dashboard-progress-text">{info.progress}% Complete</span>
      </div>

      <div className="pregnancy-dashboard-details">
        <div className="pregnancy-dashboard-detail-item">
          <Calendar size={16} />
          <div>
            <span className="pregnancy-dashboard-detail-label">Due Date</span>
            <span className="pregnancy-dashboard-detail-value">{formatDate(info.dueDate)}</span>
          </div>
        </div>
        <div className="pregnancy-dashboard-detail-item">
          <Clock size={16} />
          <div>
            <span className="pregnancy-dashboard-detail-label">Days Remaining</span>
            <span className="pregnancy-dashboard-detail-value">
              {info.daysRemaining > 0 ? `${info.daysRemaining} days` : 'Any day now!'}
            </span>
          </div>
        </div>
        <div className="pregnancy-dashboard-detail-item">
          <Heart size={16} />
          <div>
            <span className="pregnancy-dashboard-detail-label">Trimester</span>
            <span className="pregnancy-dashboard-detail-value">{info.trimester}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
