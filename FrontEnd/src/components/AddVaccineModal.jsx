import { useEffect, useState } from 'react';

const EMOJI_OPTIONS = ['💉', '🧪', '🩹', '🏥', '💊'];

export default function AddVaccineModal({ isOpen, onClose, onAdd, recipient = 'baby', babyId = null }) {
  const [vaccineName, setVaccineName] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [status, setStatus] = useState('upcoming');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState(EMOJI_OPTIONS[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = new Date();
      setReminderDate(`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`);
      setVaccineName('');
      setDescription('');
      setStatus('upcoming');
      setEmoji(EMOJI_OPTIONS[0]);
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vaccineName.trim() || !reminderDate) {
      setError('Please enter a vaccine name and date');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onAdd({
        vaccine_name: vaccineName.trim(),
        reminder_date: reminderDate,
        dose_number: 1,
        total_doses: 1,
        recipient,
        age_due_months: null,
        description: description.trim(),
        vaccine_icon: emoji,
        status,
        last_dose_date: status === 'completed' ? reminderDate : null,
        baby_id: babyId,
      });
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add vaccine');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="vaccine-info-overlay" onClick={onClose}>
      <div className="vaccine-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="vaccine-info-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="vaccine-info-header">
          <span className="vaccine-info-emoji">➕</span>
          <h2>Add Vaccine</h2>
        </div>

        <form className="add-vaccine-form" onSubmit={handleSubmit}>
          <label className="add-vaccine-label">Vaccine Name *</label>
          <input
            className="add-vaccine-input"
            value={vaccineName}
            onChange={e => setVaccineName(e.target.value)}
            placeholder="e.g. Typhoid vaccine"
          />

          <label className="add-vaccine-label">Date *</label>
          <input
            className="add-vaccine-input"
            type="date"
            value={reminderDate}
            onChange={e => setReminderDate(e.target.value)}
          />

          <label className="add-vaccine-label">Status *</label>
          <select
            className="add-vaccine-input"
            value={status}
            onChange={e => setStatus(e.target.value)}
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>

          <label className="add-vaccine-label">Notes (optional)</label>
          <input
            className="add-vaccine-input"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Any additional details"
          />

          <label className="add-vaccine-label">Icon</label>
          <div className="add-vaccine-emoji-row">
            {EMOJI_OPTIONS.map(opt => (
              <button
                key={opt}
                type="button"
                className={`add-vaccine-emoji-btn ${emoji === opt ? 'active' : ''}`}
                onClick={() => setEmoji(opt)}
              >
                {opt}
              </button>
            ))}
          </div>

          {error && <p className="add-vaccine-error">{error}</p>}

          <button type="submit" className="vaccine-action-btn mark-done add-vaccine-submit" disabled={saving}>
            {saving ? 'Adding...' : 'Add Vaccine'}
          </button>
        </form>
      </div>
    </div>
  );
}
