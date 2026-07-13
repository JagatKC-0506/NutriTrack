import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, ListChecks } from 'lucide-react';
import { DAILY_CHECKLIST_ITEMS } from '../../data/vaccineEnrichment';

const CHECKLIST_STORAGE_KEY = 'pregnancy_daily_checklist';

function loadChecklist() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    return data[today] || {};
  } catch {
    return {};
  }
}

function saveChecklist(items) {
  try {
    const today = new Date().toISOString().split('T')[0];
    const raw = localStorage.getItem(CHECKLIST_STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[today] = items;
    localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export default function DailyChecklist() {
  const [checklist, setChecklist] = React.useState(loadChecklist);

  const toggleItem = useCallback((id) => {
    setChecklist(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecklist(next);
      return next;
    });
  }, []);

  const completedCount = useMemo(() => Object.values(checklist).filter(Boolean).length, [checklist]);
  const totalItems = DAILY_CHECKLIST_ITEMS.length;
  const progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  return (
    <motion.div
      className="daily-checklist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="daily-checklist-header">
        <div className="daily-checklist-title-row">
          <ListChecks size={20} />
          <h3>Today's Checklist</h3>
        </div>
        <span className="daily-checklist-count">{completedCount} / {totalItems}</span>
      </div>

      <div className="daily-checklist-progress">
        <div className="daily-checklist-progress-bar">
          <motion.div
            className="daily-checklist-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <span className="daily-checklist-progress-text">Today's Progress: {completedCount} of {totalItems} completed</span>
      </div>

      <div className="daily-checklist-items">
        {DAILY_CHECKLIST_ITEMS.map((item) => {
          const done = !!checklist[item.id];
          return (
            <motion.button
              key={item.id}
              className={`daily-checklist-item ${done ? 'completed' : ''}`}
              onClick={() => toggleItem(item.id)}
              whileTap={{ scale: 0.97 }}
              aria-label={`${done ? 'Completed' : 'Not completed'}: ${item.label}`}
            >
              <span className="daily-checklist-emoji">{item.emoji}</span>
              <span className={`daily-checklist-label ${done ? 'done' : ''}`}>
                {item.label}
              </span>
              {done ? (
                <CheckCircle2 size={20} className="daily-checklist-check done" />
              ) : (
                <Circle size={20} className="daily-checklist-check" />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}


