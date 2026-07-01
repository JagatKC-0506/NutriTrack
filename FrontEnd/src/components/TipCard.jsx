/**
 * TIP CARD COMPONENT
 * ==================
 * Displays a daily tip or advice for the user
 * Yellow background with icon and text content
 */

export default function TipCard({ title = "Today's Tip", content = "" }) {
  const defaultContent = "Stay hydrated! Aim for 8-10 glasses of water daily to support your baby's development.";

  return (
    <div className="tip-card">
      <div className="tip-icon">💡</div>
      <div className="tip-content">
        <h3>{title}</h3>
        <p>{content || defaultContent}</p>
      </div>
    </div>
  );
}
