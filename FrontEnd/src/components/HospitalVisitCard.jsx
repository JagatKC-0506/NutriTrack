/**
 * HOSPITAL VISIT CARD COMPONENT
 * ==============================
 * Displays an individual hospital visit log card
 *
 * @param {string}   hospitalName   - Name of the hospital/clinic
 * @param {string}   doctorName     - Name of the attending doctor
 * @param {string}   reason         - Reason / type of visit
 * @param {string}   visitDate      - Visit date (YYYY-MM-DD)
 * @param {string}   followUpDate   - Optional follow-up date (YYYY-MM-DD)
 * @param {string}   notes          - Free-text notes
 * @param {string}   status         - completed | upcoming
 * @param {string}   visitFor       - mother | baby
 * @param {string}   babyName       - Name of baby (if visitFor === 'baby')
 * @param {function} onEdit         - Callback when edit is clicked
 * @param {function} onDelete       - Callback when delete is clicked
 */

function formatDateOnly(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function HospitalVisitCard({
  hospitalName = 'Hospital',
  doctorName = '',
  reason = '',
  visitDate = '',
  followUpDate = '',
  notes = '',
  status = 'completed',
  visitFor = 'mother',
  babyName = '',
  onEdit = () => {},
  onDelete = () => {},
}) {
  const formattedVisitDate = formatDateOnly(visitDate);
  const formattedFollowUp = formatDateOnly(followUpDate);

  return (
    <div className={`hospital-card ${status === 'upcoming' ? 'upcoming' : ''}`}>
      <div className="hospital-card-header">
        <div className="hospital-card-icon">🏥</div>
        <div className="hospital-card-title-section">
          <h3 className="hospital-card-title">{hospitalName}</h3>
          <div className="hospital-card-status-wrapper">
            <span className={`hospital-card-status ${status}`}>
              {status === 'completed' ? '✓ Completed' : '⏰ Upcoming'}
            </span>
            <span className="hospital-card-for-badge">
              {visitFor === 'baby' ? `👶 ${babyName || 'Baby'}` : '🤰 Mother'}
            </span>
          </div>
        </div>
      </div>

      <div className="hospital-card-details">
        {reason && (
          <div className="hospital-detail-item">
            <span className="hospital-detail-label">📋</span>
            <span className="hospital-detail-value">{reason}</span>
          </div>
        )}
        {doctorName && (
          <div className="hospital-detail-item">
            <span className="hospital-detail-label">🩺</span>
            <span className="hospital-detail-value">Dr. {doctorName}</span>
          </div>
        )}
        {formattedVisitDate && (
          <div className="hospital-detail-item">
            <span className="hospital-detail-label">📅</span>
            <span className="hospital-detail-value">{formattedVisitDate}</span>
          </div>
        )}
        {formattedFollowUp && (
          <div className="hospital-detail-item">
            <span className="hospital-detail-label">🔁</span>
            <span className="hospital-detail-value">Follow-up: {formattedFollowUp}</span>
          </div>
        )}
        {notes && (
          <div className="hospital-detail-item hospital-card-notes">
            <span className="hospital-detail-label">📝</span>
            <span className="hospital-detail-value">{notes}</span>
          </div>
        )}
      </div>

      <div className="hospital-card-action">
        <button className="hospital-action-btn edit" onClick={onEdit}>
          Edit
        </button>
        <button className="hospital-action-btn delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
