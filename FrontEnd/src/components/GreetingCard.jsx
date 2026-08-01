/**
 * GREETING CARD COMPONENT
 * =======================
 * Displays a personalized greeting with user info
 * Shows current trimester/month and due date
 * Includes profile button
 */

import { useNavigate } from 'react-router-dom';

export default function GreetingCard({
  userName = "",
  trimester = "Trimester 2",
  dueDate = "",
  weeksPregnant = null,
  userType = 'pregnant',
  profileImage = null,
  onNotificationClick
}) {
  const navigate = useNavigate();

  const safeWeeks = typeof weeksPregnant === 'number' ? Math.max(0, Math.min(40, weeksPregnant)) : null;
  const weekPercent = safeWeeks !== null ? Math.round((safeWeeks / 40) * 100) : null;

  return (
    <div className="greeting-card">
      <div className="greeting-header">
        <div className="greeting-text">
          <h1>Hello, <br /> <strong>{userName || 'Guest'}</strong></h1>
        </div>
        <div className="greeting-actions">
          <button className="notification-button" onClick={onNotificationClick} title="Notifications">
            <span>🔔</span>
          </button>
          <button className="profile-button" onClick={() => navigate('/profile')} title="Go to Profile">
            {profileImage ? (
              <img className="profile-button-img" src={profileImage} alt="Profile" />
            ) : (
              <span>👤</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Show trimester info only for pregnant users */}
      {userType === 'pregnant' && (
        <div className="trimester-info">
          <div className="info-badge">
            <span className="badge-icon">❤️</span>
            <div className="badge-content">
              <p className="week-text">Week {safeWeeks !== null ? safeWeeks : '—'}</p>
              {weekPercent !== null && (
                <div className="week-progress">
                  <div className="week-progress-fill" style={{ width: `${weekPercent}%` }} />
                </div>
              )}
              <p className="week-meta">
                {trimester}
                {formatDate(dueDate) !== '—' && ` • Due: ${formatDate(dueDate)}`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to format date
function formatDate(dateString) {
  if (!dateString) return '—';
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-CA', options);
}
