import { useState, useEffect, useCallback } from 'react';
import { getGrowthMilestonesStatic, getMilestones, createMilestone, updateMilestone } from '../api';

export default function DevelopmentalMilestones({ selectedBaby, babyAgeMonths }) {
  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [milestoneMap, setMilestoneMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

  const monthIndex = Math.min(Math.max(Math.round(babyAgeMonths), 0), 12);

  useEffect(() => {
    if (!selectedBaby) return;
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const [refData, progress] = await Promise.all([
          getGrowthMilestonesStatic(),
          getMilestones(selectedBaby.id),
        ]);
        if (cancelled) return;

        const monthData = Array.isArray(refData)
          ? refData.find(m => m.month === monthIndex)
          : null;
        setCurrentMonthData(monthData);

        const map = {};
        if (Array.isArray(progress)) {
          progress.forEach(m => { map[m.milestone_key] = m; });
        }
        setMilestoneMap(map);
      } catch (err) {
        console.error('Failed to load milestone data:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [selectedBaby, monthIndex]);

  const handleToggle = useCallback(async (devItem) => {
    const existing = milestoneMap[devItem.key];
    setSaving(devItem.key);

    try {
      if (existing) {
        const newCompleted = !existing.completed;
        const completedDate = newCompleted ? new Date().toISOString().split('T')[0] : null;
        await updateMilestone(existing.id, { completed: newCompleted, completed_date: completedDate });
        setMilestoneMap(prev => ({
          ...prev,
          [devItem.key]: { ...existing, completed: newCompleted, completed_date: completedDate },
        }));
      } else {
        const completedDate = new Date().toISOString().split('T')[0];
        const created = await createMilestone({
          baby_id: selectedBaby.id,
          milestone_name: devItem.name,
          milestone_key: devItem.key,
          expected_age_months: devItem.ageMonths ?? monthIndex,
          completed: true,
          completed_date: completedDate,
        });
        setMilestoneMap(prev => ({ ...prev, [devItem.key]: created }));
      }
    } catch (err) {
      console.error('Failed to toggle milestone:', err);
    } finally {
      setSaving(null);
    }
  }, [milestoneMap, selectedBaby, monthIndex]);

  if (loading) {
    return (
      <div className="dev-milestones-card">
        <h3>🧠 Developmental Milestones</h3>
        <div className="growth-skeleton">
          <div className="growth-skeleton-line" />
          <div className="growth-skeleton-line" />
          <div className="growth-skeleton-line medium" />
        </div>
      </div>
    );
  }

  if (!currentMonthData || !currentMonthData.development || currentMonthData.development.length === 0) {
    return null;
  }

  const devItems = currentMonthData.development;
  const completedCount = devItems.filter(d => milestoneMap[d.key]?.completed).length;
  const totalCount = devItems.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="dev-milestones-card">
      <div className="dev-milestones-header">
        <h3>🧠 Developmental Milestones</h3>
        <span className="dev-milestones-age">{currentMonthData.title}</span>
      </div>

      <div className="dev-milestones-progress">
        <div className="dev-progress-track">
          <div className="dev-progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <span className="dev-progress-text">{completedCount} / {totalCount} completed</span>
      </div>

      <div className="dev-milestones-list">
        {devItems.map((item) => {
          const isCompleted = milestoneMap[item.key]?.completed ?? false;
          const isSaving = saving === item.key;
          return (
            <button
              key={item.key}
              type="button"
              className={`dev-milestone-item ${isCompleted ? 'completed' : ''}`}
              onClick={() => handleToggle(item)}
              disabled={isSaving}
            >
              <span className="dev-milestone-check">
                {isSaving ? '⏳' : isCompleted ? '✅' : '⬜'}
              </span>
              <span className="dev-milestone-emoji">{item.emoji}</span>
              <span className="dev-milestone-label">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
