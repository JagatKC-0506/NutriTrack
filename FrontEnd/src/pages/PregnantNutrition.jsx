import { useState, useEffect, useMemo } from 'react';
import NutritionHeader from '../components/NutritionHeader';
import NutritionCard from '../components/NutritionCard';
import AvoidFoodCard from '../components/AvoidFoodCard';
import FoodDetailModal from '../components/FoodDetailModal';
import BottomNavigation from '../components/BottomNavigation';
import { getAllFoods, getCurrentUser, getNutritionTips } from '../api';
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

const DAY_MS = 24 * 60 * 60 * 1000;

const calculateTrimester = (dueDateString) => {
  if (!dueDateString) return { trimester: 'Trimester 2', weeksPregnant: null, trimesterNum: '2' };
  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) return { trimester: 'Trimester 2', weeksPregnant: null, trimesterNum: '2' };
  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const estimatedLmp = new Date(dueDate.getTime() - 280 * DAY_MS);
  const normalizedLmp = new Date(estimatedLmp.getFullYear(), estimatedLmp.getMonth(), estimatedLmp.getDate());
  const daysPregnant = Math.floor((normalizedToday - normalizedLmp) / DAY_MS);
  if (daysPregnant < 0) return { trimester: 'Trimester 1', weeksPregnant: 0, trimesterNum: '1' };
  const weeksPregnant = Math.min(40, Math.floor(daysPregnant / 7));
  if (weeksPregnant < 13) return { trimester: 'Trimester 1', weeksPregnant, trimesterNum: '1' };
  if (weeksPregnant < 28) return { trimester: 'Trimester 2', weeksPregnant, trimesterNum: '2' };
  return { trimester: 'Trimester 3', weeksPregnant, trimesterNum: '3' };
};

const TRIMESTER_INFO = {
  '1': {
    label: 'First Trimester', emoji: '🌱', calRec: '~1,800 calories/day',
    explanation: 'Focus on folate-rich foods to prevent neural tube defects. Small, frequent meals help with nausea.',
    tips: ['Eat small, frequent meals to manage nausea', 'Include folate-rich foods daily', 'Stay hydrated with water and electrolyte drinks', 'Take prenatal vitamins with folic acid', 'Avoid foods that trigger morning sickness']
  },
  '2': {
    label: 'Second Trimester', emoji: '🌿', calRec: '~2,200 calories/day',
    explanation: 'Increase protein and calcium intake as baby grows rapidly. Energy levels typically improve.',
    tips: ['Increase protein intake for growing baby', 'Include calcium-rich foods for bone development', 'Add iron-rich foods to prevent anemia', 'Stay active with pregnancy-safe exercise', 'Monitor weight gain as recommended by your doctor']
  },
  '3': {
    label: 'Third Trimester', emoji: '🌳', calRec: '~2,400 calories/day',
    explanation: 'Baby gains weight rapidly. Focus on iron, omega-3s, and fiber. Eat smaller meals as space gets tight.',
    tips: ['Eat smaller, more frequent meals', 'Boost iron intake for increased blood volume', 'Include omega-3 DHA for baby\'s brain development', 'Increase fiber to prevent constipation', 'Stay hydrated to prevent contractions and UTIs']
  }
};

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

export default function PregnantNutrition() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nutritionTips, setNutritionTips] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  const [avoidFoods, setAvoidFoods] = useState([]);
  const [activeTrimester, setActiveTrimester] = useState('2');
  const [userTrimester, setUserTrimester] = useState('2');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [dietFilter, setDietFilter] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [user, foodsData, tipsData] = await Promise.all([
        getCurrentUser().catch(() => null),
        getAllFoods(),
        getNutritionTips().catch(() => ({ tips: [] }))
      ]);
      const recommended = foodsData.filter(f => f.type === 'recommended');
      const avoid = foodsData.filter(f => f.type === 'avoid');
      setAllFoods(recommended);
      setAvoidFoods(avoid);
      setNutritionTips(tipsData.tips || []);
      if (user) {
        const { trimesterNum } = calculateTrimester(user.due_date);
        setActiveTrimester(trimesterNum);
        setUserTrimester(trimesterNum);
      }
    } catch (err) {
      setError('Failed to load nutrition data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const trimesterFiltered = useMemo(() => {
    let foods = allFoods;
    if (activeTrimester) {
      const tLabel = `Trimester ${activeTrimester}`;
      foods = foods.filter(f => f.trimester === 'All' || f.trimester === tLabel);
    }
    return foods;
  }, [allFoods, activeTrimester]);

  const dietFilteredFoods = useMemo(() => {
    if (!dietFilter) return trimesterFiltered;
    return trimesterFiltered.filter(f => f.diet_type === dietFilter);
  }, [trimesterFiltered, dietFilter]);

  const categoryFoods = useMemo(() => {
    if (!activeCategory) return [];
    return dietFilteredFoods.filter(f => f.nutrient_group === activeCategory);
  }, [dietFilteredFoods, activeCategory]);

  const triInfo = TRIMESTER_INFO[activeTrimester] || TRIMESTER_INFO['2'];

  if (loading) {
    return (
      <div className="nutrition-container">
        <NutritionHeader trimester={`Trimester ${activeTrimester}`} userType="pregnant" />
        <NutritionSkeleton />
        <BottomNavigation activeTab="Nutrition" userType="pregnant" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="nutrition-container">
        <NutritionHeader trimester={`Trimester ${activeTrimester}`} userType="pregnant" />
        <div className="nutrition-main">
          <div className="nutrition-empty-state">
            <div className="empty-icon">⚠️</div>
            <h3>Unable to Load Data</h3>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchData}>Try Again</button>
          </div>
        </div>
        <BottomNavigation activeTab="Nutrition" userType="pregnant" />
      </div>
    );
  }

  return (
    <div className="nutrition-container">
      <NutritionHeader trimester={`Trimester ${activeTrimester}`} userType="pregnant" />

      <div className="nutrition-content">
        {/* Trimester Tabs */}
        <div className="nutrition-tabs trimester-tabs">
          {['1', '2', '3'].map(t => (
            <button key={t} className={`nutrition-tab-btn ${activeTrimester === t ? 'active' : ''}`} onClick={() => { setActiveTrimester(t); setActiveCategory(null); }}>
              {TRIMESTER_INFO[t].emoji} {TRIMESTER_INFO[t].label}
            </button>
          ))}
        </div>

        {/* Trimester Summary */}
        <div className="trimester-summary">
          <div className="trimester-summary-header">
            <h3>{triInfo.emoji} {triInfo.label}</h3>
            <span className="calorie-rec">{triInfo.calRec}</span>
          </div>
          <p className="trimester-explanation">{triInfo.explanation}</p>
          {userTrimester !== activeTrimester && (
            <p className="trimester-note">Showing {triInfo.label} information. Your current trimester: {TRIMESTER_INFO[userTrimester]?.label}</p>
          )}
        </div>

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
                <p>Try selecting a different trimester.</p>
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
                <p>Try selecting a different trimester.</p>
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

        {/* Nutrition Tips */}
        {nutritionTips.length > 0 && (
          <div className="nutrition-tips-section">
            <h3>💡 Quick Tips for {triInfo.label}</h3>
            <div className="tips-list">
              {triInfo.tips.map((tip, i) => (
                <div key={i} className="tip-item"><p>{tip}</p></div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedFood && <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />}
      <BottomNavigation activeTab="Nutrition" userType="pregnant" />
    </div>
  );
}
