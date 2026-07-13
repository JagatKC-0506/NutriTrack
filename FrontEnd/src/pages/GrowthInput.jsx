import { useState, useEffect } from 'react';

export default function GrowthInput({ onSubmit, onCancel, lastWeek, isLoading, initialData }) {
  const [form, setForm] = useState({
    week: initialData?.week || (lastWeek ? lastWeek + 1 : ''),
    weight_kg: initialData?.weight_kg || '',
    record_date: initialData?.record_date || new Date().toISOString().split('T')[0],
    notes: initialData?.notes || '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        week: initialData.week,
        weight_kg: initialData.weight_kg,
        record_date: initialData.record_date,
        notes: initialData.notes || '',
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!form.week || form.week < 1 || form.week > 42) newErrors.week = 'Week must be 1-42';
    if (!form.weight_kg || form.weight_kg <= 0) newErrors.weight_kg = 'Enter valid weight';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      week: parseInt(form.week),
      weight_kg: parseFloat(form.weight_kg),
      record_date: form.record_date,
      notes: form.notes || null,
    });
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--card-muted)',
    border: '1px solid var(--border)',
    borderRadius: '8px',
    color: 'var(--text-main)',
    padding: '12px',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
  };

  return (
    <div className="current-stats-card" style={{ borderLeft: '4px solid var(--growth-purple)' }}>
      <h3 style={{ color: 'var(--text-main)', marginTop: 0, marginBottom: '16px' }}>
        {initialData ? 'Edit Weight Record' : 'New Weight Record'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Pregnancy Week *</label>
          <input
            type="number"
            name="week"
            min="1"
            max="42"
            value={form.week}
            onChange={handleChange}
            placeholder="e.g., 24"
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--growth-purple)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          {errors.week && <p style={{ color: '#ef4444', fontSize: '11px', margin: '4px 0 0' }}>{errors.week}</p>}
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Weight (kg) *</label>
          <input
            type="number"
            name="weight_kg"
            min="0"
            step="0.1"
            value={form.weight_kg}
            onChange={handleChange}
            placeholder="e.g., 65.5"
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--growth-purple)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
          {errors.weight_kg && <p style={{ color: '#ef4444', fontSize: '11px', margin: '4px 0 0' }}>{errors.weight_kg}</p>}
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Date *</label>
          <input
            type="date"
            name="record_date"
            value={form.record_date}
            onChange={handleChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = 'var(--growth-purple)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '4px', display: 'block' }}>Notes (optional)</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Any notes..."
            rows="2"
            style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
          <button type="button" onClick={onCancel} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-muted)', fontWeight: '600', cursor: 'pointer' }}>
            Cancel
          </button>
          <button type="submit" className="add-button" style={{ flex: 1, margin: 0 }} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </form>
    </div>
  );
}