export default function FoodDetailModal({ food, onClose }) {
  if (!food) return null;

  const isAvoid = !food.is_recommended;

  const nutritionalFields = [
    { label: 'Calories', value: food.calories },
    { label: 'Protein', value: food.protein },
    { label: 'Iron', value: food.iron },
    { label: 'Calcium', value: food.calcium },
    { label: 'Folate', value: food.folate },
    { label: 'Vitamin D', value: food.vitamin_d },
    { label: 'Omega-3', value: food.omega3 },
    { label: 'Fiber', value: food.fiber },
    { label: 'Hydration', value: food.hydration },
  ].filter(f => f.value && f.value !== 'N/A');

  const displayNutrients = food.nutrients && Array.isArray(food.nutrients) ? food.nutrients : [];

  return (
    <div className="food-modal-overlay" onClick={onClose}>
      <div className="food-modal" onClick={(e) => e.stopPropagation()}>
        <button className="food-modal-close" onClick={onClose} aria-label="Close">&times;</button>

        {isAvoid ? (
          <>
            <div className="food-modal-header avoid">
              <div className="food-modal-emoji">⚠️</div>
              <h2>{food.name}</h2>
              <span className="food-modal-category">{food.category}</span>
            </div>
            <div className="food-modal-body">
              <div className="food-modal-warning">
                <strong>⚠ Warning</strong>
                <p>{food.warning || food.description}</p>
              </div>
              {food.reason_to_avoid && (
                <div className="food-modal-section">
                  <h4>Why to Avoid</h4>
                  <p>{food.reason_to_avoid}</p>
                </div>
              )}
              {food.safer_alternative && (
                <div className="food-modal-section">
                  <h4>Safer Alternative</h4>
                  <p>{food.safer_alternative}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="food-modal-header">
              <div className="food-modal-emoji">{food.emoji || '🍎'}</div>
              <h2>{food.name}</h2>
              <span className="food-modal-category">{food.category}</span>
              {food.diet_type && <span className="food-modal-diet-type">{food.diet_type}</span>}
            </div>
            <div className="food-modal-body">
              {food.benefits && (
                <div className="food-modal-section">
                  <h4>Benefits During Pregnancy</h4>
                  <p>{food.benefits}</p>
                </div>
              )}

              {nutritionalFields.length > 0 && (
                <div className="food-modal-section">
                  <h4>Nutritional Information</h4>
                  <div className="food-modal-nutrition-grid">
                    {nutritionalFields.map((f, i) => (
                      <div key={i} className="food-modal-nutrition-item">
                        <span className="nutrition-label">{f.label}</span>
                        <span className="nutrition-value">{f.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {displayNutrients.length > 0 && (
                <div className="food-modal-section">
                  <h4>Key Nutrients</h4>
                  <div className="food-modal-tags">
                    {displayNutrients.map((n, i) => <span key={i} className="nutrient-tag">{n}</span>)}
                  </div>
                </div>
              )}

              {food.serving_size && (
                <div className="food-modal-section">
                  <h4>Serving Size</h4>
                  <p>{food.serving_size}</p>
                </div>
              )}

              {food.food_type && (
                <div className="food-modal-section">
                  <h4>Food Type</h4>
                  <p>{food.food_type}</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
