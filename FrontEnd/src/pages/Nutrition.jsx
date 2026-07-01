import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import NutritionHeader from '../components/NutritionHeader';
import NutritionCard from '../components/NutritionCard';
import AvoidFoodCard from '../components/AvoidFoodCard';
import FoodDetailModal from '../components/FoodDetailModal';
import BottomNavigation from '../components/BottomNavigation';
import { getAllFoods, getNutritionTips } from '../api';
import '../styles/Nutrition.css';

const CATEGORIES = [
  { key: 'Hydration', label: 'Hydration', emoji: '💧' },
  { key: 'Fiber Rich Foods', label: 'Fiber Rich', emoji: '🌾' },
  { key: 'Vitamin D Foods', label: 'Vitamin D', emoji: '☀️' },
  { key: 'Omega-3 Foods', label: 'Omega-3', emoji: '🐟' },
  { key: 'Protein Rich Foods', label: 'Protein', emoji: '🥩' },
  { key: 'Iron Rich Foods', label: 'Iron Rich', emoji: '🩸' },
  { key: 'Calcium Rich Foods', label: 'Calcium', emoji: '🦴' },
  { key: 'Folate Rich Foods', label: 'Folate', emoji: '🌿' },
];

function NutritionSkeleton() {
  return (
    <div className="nutrition-main">
      <div className="nutrition-skeleton">
        <div className="skeleton-line wide" /><div className="skeleton-line medium" />
        <div className="skeleton-line" /><div className="skeleton-card" />
        <div className="skeleton-card" /><div className="skeleton-card" />
      </div>
    </div>
  );
}

export default function Nutrition() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFoods, setAllFoods] = useState([]);
  const [avoidFoods, setAvoidFoods] = useState([]);
  const [nutritionTips, setNutritionTips] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dietFilter, setDietFilter] = useState(null);
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [foodsData, tipsData] = await Promise.all([
        getAllFoods(),
        getNutritionTips().catch(() => ({ tips: [] }))
      ]);
      setAllFoods(foodsData.filter(f => f.type === 'recommended'));
      setAvoidFoods(foodsData.filter(f => f.type === 'avoid'));
      setNutritionTips(tipsData.tips || []);
    } catch (err) {
      setError('Failed to load nutrition data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const dietFilteredFoods = useMemo(() => {
    if (!dietFilter) return allFoods;
    return allFoods.filter(f => f.diet_type === dietFilter);
  }, [allFoods, dietFilter]);

  const categoryFoods = useMemo(() => {
    if (!activeCategory) return [];
    return dietFilteredFoods.filter(f => f.nutrient_group === activeCategory);
  }, [dietFilteredFoods, activeCategory]);

  if (loading) {
    return (
      <div className="nutrition-container">
        <NutritionHeader onBack={() => navigate('/home')} />
        <NutritionSkeleton />
        <BottomNavigation activeTab="Nutrition" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nutrition-container">
        <NutritionHeader onBack={() => navigate('/home')} />
        <div className="nutrition-main">
          <div className="nutrition-empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Unable to Load Data</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchData}>Try Again</button>
          </div>
        </div>
        <BottomNavigation activeTab="Nutrition" />
      </div>
    );
  }

  return (
    <div className="nutrition-container">
      <NutritionHeader onBack={() => navigate('/home')} />

      <div className="nutrition-main">
        {/* Nutrition Tip */}
        {nutritionTips.length > 0 && (
          <div className="nutrition-tip-card">
            <div className="nutrition-tip-icon">💡</div>
            <div className="nutrition-tip-content">
              <h3>Nutrition Tip</h3>
              <p>{nutritionTips[Math.floor(Math.random() * nutritionTips.length)]}</p>
            </div>
          </div>
        )}

        {/* Overview Buttons: All + Avoid */}
        <div className="category-grid overview-grid">
          <button
            className={`category-btn ${activeCategory === 'ALL' ? 'active' : ''}`}
            onClick={() => setActiveCategory(activeCategory === 'ALL' ? null : 'ALL')}
          >
            <span className="category-emoji">🍽️</span>
            <span className="category-label">All</span>
          </button>
          <button
            className={`category-btn ${activeCategory === 'AVOID' ? 'active' : ''}`}
            onClick={() => setActiveCategory(activeCategory === 'AVOID' ? null : 'AVOID')}
          >
            <span className="category-emoji">🚫</span>
            <span className="category-label">Avoid</span>
          </button>
        </div>

        {/* Nutrient Category Grid */}
        <div className="category-grid nutrient-grid">
          {CATEGORIES.map(cat => (
            <button
              key={cat.key}
              className={`category-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
            >
              <span className="category-emoji">{cat.emoji}</span>
              <span className="category-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Selected Foods Content */}
        {activeCategory === 'ALL' ? (
          <div className="category-foods-section">
            <h3 className="category-foods-title">🍽️ All Recommended Foods</h3>
            <div className="diet-filter-pills">
              <button className={`diet-filter-pill ${!dietFilter ? 'active' : ''}`} onClick={() => setDietFilter(null)}>All</button>
              <button className={`diet-filter-pill ${dietFilter === 'Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Vegetarian')}>🥦 Veg</button>
              <button className={`diet-filter-pill ${dietFilter === 'Non-Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Non-Vegetarian')}>🍗 Non-Veg</button>
            </div>
            {dietFilteredFoods.length > 0 ? (
              <div className="nutrition-items-list category-foods-list">
                {dietFilteredFoods.map(food => (
                  <NutritionCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
                ))}
              </div>
            ) : (
              <div className="nutrition-empty-state category-empty">
                <div className="empty-icon">🥗</div>
                <h3>No foods available</h3>
                <p>There are no foods to display.</p>
              </div>
            )}
          </div>
        ) : activeCategory === 'AVOID' ? (
          <div className="category-foods-section">
            <h3 className="category-foods-title">🚫 Foods to Avoid</h3>
            {avoidFoods.length > 0 ? (
              <div className="nutrition-items-list category-foods-list">
                {avoidFoods.map(food => (
                  <AvoidFoodCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
                ))}
              </div>
            ) : (
              <div className="nutrition-empty-state category-empty">
                <div className="empty-icon">✅</div>
                <h3>No foods to avoid</h3>
                <p>All foods in your selection are safe.</p>
              </div>
            )}
          </div>
        ) : activeCategory ? (
          <div className="category-foods-section">
            <h3 className="category-foods-title">{CATEGORIES.find(c => c.key === activeCategory)?.emoji} {CATEGORIES.find(c => c.key === activeCategory)?.label} Foods</h3>
            <div className="diet-filter-pills">
              <button className={`diet-filter-pill ${!dietFilter ? 'active' : ''}`} onClick={() => setDietFilter(null)}>All</button>
              <button className={`diet-filter-pill ${dietFilter === 'Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Vegetarian')}>🥦 Veg</button>
              <button className={`diet-filter-pill ${dietFilter === 'Non-Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Non-Vegetarian')}>🍗 Non-Veg</button>
            </div>
            {categoryFoods.length > 0 ? (
              <div className="nutrition-items-list category-foods-list">
                {categoryFoods.map(food => (
                  <NutritionCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
                ))}
              </div>
            ) : (
              <div className="nutrition-empty-state category-empty">
                <div className="empty-icon">🥗</div>
                <h3>No foods in this category</h3>
                <p>There are no foods available for this nutrient group.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="nutrition-empty-state category-prompt">
            <div className="empty-icon">👆</div>
            <h3>Select a Nutrient Category</h3>
            <p>Tap any category above to see recommended foods for that nutrient group.</p>
          </div>
        )}

      </div>

      {selectedFood && <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />}
      <BottomNavigation activeTab="Nutrition" />
    </div>
  );
}
