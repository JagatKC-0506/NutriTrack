/**
 * VACCINE CARD COMPONENT
 * ======================
 * Displays individual vaccine cards with comprehensive information
 * 
 * Features:
 * - Shows vaccine name, emoji icon, and description
 * - Displays status (taken, pending, upcoming, completed, overdue)
 * - Shows recommendation badge for recommended vaccines
 * - Displays due date and recipient information (Mother/Baby)
 * - Provides "Mark Done" button for pending vaccines
 * - Highlights urgent vaccines due within a week
 * 
 * @param {number}   id               - Unique identifier for the vaccine reminder
 * @param {string}   name             - Vaccine name
 * @param {string}   emoji            - Emoji icon (default: 💉)
 * @param {string}   description      - Vaccine description
 * @param {string}   dueDate          - Due date in YYYY-MM-DD format
 * @param {string}   status           - Status: taken, pending, upcoming, completed, overdue
 * @param {string}   forPerson        - Recipient: Mother or Baby
 * @param {string}   details          - Additional details (e.g., dose number)
 * @param {boolean}  isDueWithinWeek  - True if due within 7 days
 * @param {boolean}  recommended      - True if this is a recommended vaccine
 * @param {function} onMarkDone       - Callback when "Mark Done" is clicked
 */

// Format date for display (expects YYYY-MM-DD format from backend)
function formatDateOnly(dateString) {
  if (!dateString) return 'Date not set';
  
  // Parse YYYY-MM-DD format
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (Number.isNaN(date.getTime())) return 'Date not set';
  
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default function VaccineCard({ 
  name = "Vaccine Name",
  emoji = "💉",
  dueDate = "Dec 1, 2025",
  status = "upcoming", // taken, pending, upcoming, completed
  forPerson = "Mother", // Mother, Baby
  details = "", // Additional details
  isDueWithinWeek = false, // Highlight if due within 7 days
  recommended = false, // Show recommended badge
  onMarkDone = () => {},
  onUndo = null, // Show undo button when provided and vaccine is completed
  onDelete = null, // Show delete button when provided (custom vaccines)
  onInfo = null // Show info button when provided
}) {
  const formattedDate = formatDateOnly(dueDate);
  
  return (
    <div className={`vaccine-card ${isDueWithinWeek && status !== 'taken' && status !== 'completed' ? 'urgent' : ''}`}>
      {/* Card Header with Icon and Title */}
      <div className="vaccine-card-header">
        <div className="vaccine-card-icon">{emoji}</div>
        <div className="vaccine-card-title-section">
          <h3 className="vaccine-card-title">{name}</h3>
          
          {/* Status and Badges Row */}
          <div className="vaccine-card-status-wrapper">
            {/* Main Status Badge */}
            <span className={`vaccine-card-status ${status}`}>
              {status === 'taken' && '✓ Taken'}
              {status === 'completed' && '✓ Completed'}
              {status === 'pending' && '⏱ Pending'}
              {status === 'upcoming' && '⏰ Upcoming'}
              {status === 'overdue' && '⚠ Overdue'}
              {status === 'available' && '➕ Available'}
            </span>
            
            {/* Recommended Badge - Shows for recommended vaccines */}
            {recommended && (
              <span className="vaccine-recommended-badge">⭐ Recommended</span>
            )}
            
            {/* Urgent Badge - Shows for vaccines due within a week */}
            {isDueWithinWeek && status !== 'taken' && status !== 'completed' && (
              <span className="vaccine-urgent-badge">⚠ URGENT</span>
            )}
          </div>
        </div>

        {/* Info Button - Shows vaccine details in a modal */}
        {onInfo && (
          <button
            className="vaccine-card-info-btn"
            onClick={(e) => { e.stopPropagation(); onInfo(); }}
            title={`Learn more about ${name}`}
            aria-label={`Learn more about ${name}`}
          >
            i
          </button>
        )}

        {/* Delete Button - Only for custom-added vaccines */}
        {onDelete && (
          <button
            className="vaccine-card-delete-btn"
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            title={`Delete ${name}`}
            aria-label={`Delete ${name}`}
          >
            🗑️
          </button>
        )}
      </div>

      {/* Card Details Section */}
      <div className="vaccine-card-details">
        {/* Recipient Information */}
        <div className="vaccine-detail-item">
          <span className="vaccine-detail-label">👤 {forPerson}</span>
          <span className="vaccine-detail-badge">{details}</span>
        </div>
        
        {/* Due Date */}
        <div className="vaccine-detail-item">
          <span className="vaccine-detail-label">📅</span>
          <span className="vaccine-detail-value">{formattedDate}</span>
        </div>
      </div>

      {/* Action Button - Only show for actionable vaccines */}
      {status === 'completed' && onUndo ? (
        <div className="vaccine-card-action">
          <button className="vaccine-action-btn undo" onClick={onUndo} title="Revert this vaccine to not done">
            ↩ Undo
          </button>
        </div>
      ) : status !== 'taken' && status !== 'completed' && status !== 'available' && (
        <div className="vaccine-card-action">
          <button className="vaccine-action-btn mark-done" onClick={onMarkDone}>
            Mark Done
          </button>
        </div>
      )}
    </div>
  );
}
