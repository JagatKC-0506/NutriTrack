import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NutritionHeader from '../components/NutritionHeader';
import NutritionCard from '../components/NutritionCard';
import AvoidFoodCard from '../components/AvoidFoodCard';
import FoodDetailModal from '../components/FoodDetailModal';
import BottomNavigation from '../components/BottomNavigation';
import { getAllFoods, getNutritionTips } from '../api';
import { generateNutritionPDF } from '../utils/generateNutritionPDF';
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
  const userType = localStorage.getItem('userType') || localStorage.getItem('selectedStage') || 'newParent';
  const homePath = userType === 'pregnant' ? '/pregnant/home' : '/home';
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allFoods, setAllFoods] = useState([]);
  const [avoidFoods, setAvoidFoods] = useState([]);
  const [nutritionTips, setNutritionTips] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [activeSection, setActiveSection] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState(null);
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
    } catch {
      setError('Failed to load nutrition data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredFoods = allFoods.filter(f => {
    if (activeCategory && f.nutrient_group !== activeCategory) return false;
    if (dietFilter && f.diet_type !== dietFilter) return false;
    return true;
  });

  const handleExportPDF = () => {
    generateNutritionPDF({
      recommendedFoods: allFoods,
      avoidFoods,
      categories: CATEGORIES,
      title: 'Nutrition Guide'
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setActiveCategory(null);
  };

  if (loading) {
    return (
      <div className="nutrition-container">
        <NutritionHeader onBack={() => navigate(homePath)} />
        <NutritionSkeleton />
        <BottomNavigation activeTab="Nutrition" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nutrition-container">
        <NutritionHeader onBack={() => navigate(homePath)} />
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
      <NutritionHeader onBack={() => navigate(homePath)} />

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

        {/* Export PDF Button */}
        <button className="nutrition-export-pdf-btn" onClick={handleExportPDF}>
          📄 Export as PDF
        </button>

        {/* Section Toggle: All Food + Avoid Food */}
        <div className="category-grid overview-grid">
          <button
            className={`category-btn ${activeSection === 'ALL' ? 'active' : ''}`}
            onClick={() => handleSectionChange('ALL')}
          >
            <span className="category-emoji">🍽️</span>
            <span className="category-label">All Food</span>
          </button>
          <button
            className={`category-btn ${activeSection === 'AVOID' ? 'active' : ''}`}
            onClick={() => handleSectionChange('AVOID')}
          >
            <span className="category-emoji">🚫</span>
            <span className="category-label">Avoid Food</span>
          </button>
        </div>

        {activeSection === 'ALL' ? (
          <div className="category-foods-section">
            <h3 className="category-foods-title">🍽️ All Foods</h3>

            {/* Nutrient Category Filter */}
            <div className="nutrition-filter-row">
              <label className="nutrition-filter-label" htmlFor="category-select">Category</label>
              <select
                id="category-select"
                className="nutrition-filter-select"
                value={activeCategory || ''}
                onChange={(e) => setActiveCategory(e.target.value || null)}
              >
                <option value="">All</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.key} value={cat.key}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Diet Filter */}
            <div className="diet-filter-pills">
              <button className={`diet-filter-pill ${!dietFilter ? 'active' : ''}`} onClick={() => setDietFilter(null)}>All</button>
              <button className={`diet-filter-pill ${dietFilter === 'Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Vegetarian')}>🥦 Veg</button>
              <button className={`diet-filter-pill ${dietFilter === 'Non-Vegetarian' ? 'active' : ''}`} onClick={() => setDietFilter('Non-Vegetarian')}>🍗 Non-Veg</button>
            </div>

            {filteredFoods.length > 0 ? (
              <div className="nutrition-items-list category-foods-list">
                {filteredFoods.map(food => (
                  <NutritionCard key={food.id} food={food} onClick={() => setSelectedFood(food)} />
                ))}
              </div>
            ) : (
              <div className="nutrition-empty-state category-empty">
                <div className="empty-icon">🥗</div>
                <h3>No foods available</h3>
                <p>Try a different filter selection.</p>
              </div>
            )}
          </div>
        ) : (
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
        )}
      </div>

      {selectedFood && <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />}
      <BottomNavigation activeTab="Nutrition" />
    </div>
  );
}
