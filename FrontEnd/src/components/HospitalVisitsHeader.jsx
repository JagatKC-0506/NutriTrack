/**
 * HOSPITAL VISITS HEADER COMPONENT
 * =================================
 * Reusable header for the hospital visits page
 * Displays title, subtitle, back button and an "Add Visit" button
 */

export default function HospitalVisitsHeader({ onBack = () => {}, onAddVisit = () => {} }) {
  return (
    <div className="hospital-header">
      <button className="hospital-header-back" onClick={onBack} aria-label="Go back">
        ←
      </button>
      <div className="hospital-header-content">
        <h1>Hospital Visit Logs</h1>
        <p>Track checkups, follow-ups &amp; visits</p>
      </div>
      <button className="hospital-header-add" onClick={onAddVisit}>
        + Add
      </button>
    </div>
  );
}
