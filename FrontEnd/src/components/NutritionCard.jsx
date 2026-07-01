export default function NutritionCard({
  food,
  id = 1,
  name = "Food Name",
  category = "Category",
  emoji = "🍎",
  description = "Food description",
  onClick = () => {}
}) {
  const displayName = food?.name || name;
  const displayCategory = food?.category || category;
  const displayEmoji = food?.emoji || emoji;
  const displayDescription = food?.benefits || food?.description || description;
  const displayDietType = food?.diet_type;
  const displayServing = food?.serving_size;
  const displayCalories = food?.calories && food.calories !== 'N/A' ? food.calories : null;
  const displayNutrients = food?.nutrients && Array.isArray(food.nutrients) ? food.nutrients.slice(0, 3) : [];
  return (
    <div className="nutrition-item-card" onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="nutrition-item-emoji">{displayEmoji}</div>
      <div className="nutrition-item-content">
        <h4>
          {displayName}
          <span className="nutrition-item-category">{displayCategory}</span>
        </h4>
        <p>{displayDescription}</p>
        {displayNutrients.length > 0 && (
          <div className="nutrition-item-tags">
            {displayNutrients.map((n, i) => <span key={i} className="nutrient-tag">{n}</span>)}
          </div>
        )}
        <div className="nutrition-item-meta">
          {displayDietType && <span className="diet-type-badge">{displayDietType}</span>}
          {displayServing && <span className="serving-size">{displayServing}</span>}
          {displayCalories && <span className="calorie-badge">{displayCalories} cal</span>}
        </div>
      </div>
    </div>
  );
}
