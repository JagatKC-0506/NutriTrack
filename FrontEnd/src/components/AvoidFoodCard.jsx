export default function AvoidFoodCard({ food, onClick = () => {} }) {
  if (!food) return null;
  return (
    <div className="avoid-food-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="avoid-food-icon">⚠️</div>
      <div className="avoid-food-content">
        <h4 className="avoid-food-name">{food.name}</h4>
        <div className="avoid-food-detail">
          <span className="avoid-food-label">Reason:</span>
          <p>{food.reason_to_avoid || 'May pose risks during pregnancy.'}</p>
        </div>
        <div className="avoid-food-detail">
          <span className="avoid-food-label">Health Risk:</span>
          <p>{food.warning || 'Potential health risk.'}</p>
        </div>
        {food.safer_alternative && (
          <div className="avoid-food-detail">
            <span className="avoid-food-label">Safer Alternative:</span>
            <p>{food.safer_alternative}</p>
          </div>
        )}
      </div>
    </div>
  );
}
