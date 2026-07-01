import { useState } from 'react';

export default function MilestoneCard({
  name = "Milestone Name",
  emoji = "😊",
  ageInMonths = 2,
  completed = false,
  completedDate = null,
  notes = '',
  onClick = () => {},
  onEditNotes = null,
  onEditDate = null,
}) {
  const [showDetail, setShowDetail] = useState(false);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      className={`milestone-card ${completed ? 'completed' : ''}`}
      onClick={() => {
        if (!showDetail) onClick();
      }}
    >
      <div className="milestone-emoji">{emoji}</div>
      <div className="milestone-content">
        <h4>{name}</h4>
        <p className="milestone-age">📅 {ageInMonths} months</p>
        {completed && completedDate && (
          <p className="milestone-completed-date">✓ Completed: {formatDate(completedDate)}</p>
        )}
        {notes && !showDetail && (
          <p className="milestone-notes-preview">📝 {notes}</p>
        )}
        {showDetail && (
          <div className="milestone-edit-area" onClick={e => e.stopPropagation()}>
            {onEditNotes && (
              <textarea
                className="milestone-notes-input"
                placeholder="Add notes..."
                value={notes}
                onChange={(e) => onEditNotes(e.target.value)}
                rows={2}
              />
            )}
            {completed && onEditDate && (
              <div className="milestone-date-edit">
                <label>Completed date:</label>
                <input
                  type="date"
                  value={completedDate ? completedDate.split('T')[0] : ''}
                  onChange={(e) => onEditDate(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {completed ? (
        <span className="milestone-check" onClick={(e) => { e.stopPropagation(); setShowDetail(!showDetail); }}>✓</span>
      ) : (
        <span className="milestone-circle" onClick={(e) => { e.stopPropagation(); onClick(); }}>○</span>
      )}
    </div>
  );
}
