export default function GrowthHeader({ onBack = () => {} }) {
  return (
    <div className="growth-header">
      <button className="growth-header-back" onClick={onBack}>
        ←
      </button>
      <div className="growth-header-content">
        <h1>Growth Tracker</h1>
        <p>Track baby's development</p>
      </div>
    </div>
  );
}
