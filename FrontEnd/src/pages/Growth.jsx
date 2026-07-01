import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GrowthHeader from '../components/GrowthHeader';
import BabyCard from '../components/BabyCard';
import BabyForm from '../components/BabyForm';
import GrowthInput from '../components/GrowthInput';
import DevelopmentalMilestones from '../components/DevelopmentalMilestones';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from '../context/ToastContext';
import { useBabyContext } from '../context/BabyContext';
import { calculateBabyAgeDetailed } from '../utils/babyAge';
import { buildChartPoints, buildChartValues, buildLinePath, metricConfig } from '../utils/growthChart';
import {
  createBaby,
  updateBaby,
  deleteBaby,
  getBabyGrowthRecords,
  createGrowthRecord,
  deleteGrowthRecord,
  updateGrowthRecord,
} from '../api';
import '../styles/Growth.css';

export default function Growth() {
  const navigate = useNavigate();
  const { babies, selectedBaby, setSelectedBaby, setBabies } = useBabyContext();
  const [growthRecords, setGrowthRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBabyForm, setShowBabyForm] = useState(false);
  const [showGrowthInput, setShowGrowthInput] = useState(false);
  const [editingBaby, setEditingBaby] = useState(null);
  const [editingRecord, setEditingRecord] = useState(null);
  const [babyFormLoading, setBabyFormLoading] = useState(false);
  const [growthInputLoading, setGrowthInputLoading] = useState(false);
  const [trendAnalysis, setTrendAnalysis] = useState(null);
  const [chartMetric, setChartMetric] = useState('weight');
  const [chartValues, setChartValues] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const recordsEndRef = useRef(null);
  const { addToast } = useToast();

  useEffect(() => {
    setLoading(true);
    if (selectedBaby) {
      fetchGrowthRecords(selectedBaby.id);
    } else {
      setGrowthRecords([]);
      setChartValues([]);
      setTrendAnalysis(null);
      setLoading(false);
    }
  }, [selectedBaby]);

  useEffect(() => {
    if (selectedBaby) {
      const points = buildChartPoints(selectedBaby, growthRecords);
      const values = buildChartValues(points, metricConfig[chartMetric].key);
      setChartValues(values);
    }
  }, [selectedBaby, growthRecords, chartMetric]);

  const fetchGrowthRecords = async (babyId) => {
    try {
      const data = await getBabyGrowthRecords(babyId);
      setGrowthRecords(data.growth_records || []);
      setTrendAnalysis(data.trend_analysis || null);
    } catch (error) {
      console.error('Error fetching growth records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBaby = async (babyData) => {
    setBabyFormLoading(true);
    try {
      const newBaby = await createBaby(babyData);
      setBabies([...babies, newBaby]);
      setSelectedBaby(newBaby);
      setShowBabyForm(false);
      setEditingBaby(null);
      fetchGrowthRecords(newBaby.id);
      addToast('Baby added successfully!', 'success');
    } catch (error) {
      console.error('Error adding baby:', error);
      addToast('Failed to add baby: ' + error.message, 'error');
    } finally {
      setBabyFormLoading(false);
    }
  };

  const handleUpdateBaby = async (babyData) => {
    setBabyFormLoading(true);
    try {
      const updatedBaby = await updateBaby(editingBaby.id, babyData);
      setBabies(babies.map(b => b.id === updatedBaby.id ? updatedBaby : b));
      setSelectedBaby(updatedBaby);
      setShowBabyForm(false);
      setEditingBaby(null);
      addToast('Baby updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating baby:', error);
      addToast('Failed to update baby: ' + error.message, 'error');
    } finally {
      setBabyFormLoading(false);
    }
  };

  const handleDeleteBaby = async (babyId) => {
    if (window.confirm('Are you sure you want to delete this baby record?')) {
      try {
        await deleteBaby(babyId);
        const updatedBabies = babies.filter(b => b.id !== babyId);
        setBabies(updatedBabies);

        if (selectedBaby?.id === babyId) {
          if (updatedBabies.length > 0) {
            setSelectedBaby(updatedBabies[0]);
            fetchGrowthRecords(updatedBabies[0].id);
          } else {
            setSelectedBaby(null);
            setGrowthRecords([]);
          }
        }
        addToast('Baby record deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting baby:', error);
        addToast('Failed to delete baby: ' + error.message, 'error');
      }
    }
  };

  const handleEditBaby = (baby) => {
    setEditingBaby(baby);
    setShowBabyForm(true);
  };

  const handleAddGrowthRecord = async (recordData) => {
    setGrowthInputLoading(true);
    try {
      await createGrowthRecord(recordData);
      setShowGrowthInput(false);
      if (selectedBaby) {
        fetchGrowthRecords(selectedBaby.id);
      }
      addToast('Growth record added successfully!', 'success');
      setTimeout(() => recordsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error('Error adding growth record:', error);
      addToast('Failed to add growth record: ' + error.message, 'error');
    } finally {
      setGrowthInputLoading(false);
    }
  };

  const handleEditGrowthRecord = (record) => {
    setEditingRecord(record);
    setShowGrowthInput(true);
  };

  const handleUpdateGrowthRecord = async (recordData) => {
    if (!editingRecord) return;
    setGrowthInputLoading(true);
    try {
      await updateGrowthRecord(editingRecord.id, recordData);
      setShowGrowthInput(false);
      setEditingRecord(null);
      if (selectedBaby) {
        fetchGrowthRecords(selectedBaby.id);
      }
      addToast('Growth record updated successfully!', 'success');
      setTimeout(() => recordsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error('Error updating growth record:', error);
      addToast('Failed to update growth record: ' + error.message, 'error');
    } finally {
      setGrowthInputLoading(false);
    }
  };

  const handleDeleteGrowthRecord = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this growth record?')) {
      try {
        await deleteGrowthRecord(recordId);
        setGrowthRecords(growthRecords.filter(r => r.id !== recordId));
        addToast('Growth record deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting growth record:', error);
        addToast('Failed to delete growth record: ' + error.message, 'error');
      }
    }
  };

  const handleCancelGrowthInput = () => {
    setShowGrowthInput(false);
    setEditingRecord(null);
  };

  const handleBackToBabies = () => {
    setSelectedBaby(null);
    setGrowthRecords([]);
    setShowGrowthInput(false);
  };

  const _calculateAge = (dob) => {
    return calculateBabyAgeDetailed(dob).label;
  };

  const metric = metricConfig[chartMetric];
  const chartMin = chartValues.length > 0 ? Math.min(...chartValues.map(p => p.value)) : 0;
  const chartMax = chartValues.length > 0 ? Math.max(...chartValues.map(p => p.value)) : 0;
  const chartRange = chartMax - chartMin || 1;

  const getLatestWho = (record) => {
    if (!record?.who_analysis) return null;
    return record.who_analysis;
  };

  const latestRecord = growthRecords.length > 0 ? growthRecords[0] : null;
  const latestWho = latestRecord ? getLatestWho(latestRecord) : null;

  if (loading) {
    return (
      <div className="growth-container">
        <GrowthHeader onBack={() => navigate('/home')} />
        <div className="growth-main">
          <div className="growth-skeleton">
            <div className="growth-skeleton-line wide" />
            <div className="growth-skeleton-line medium" />
            <div className="growth-skeleton-line" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="growth-container">
      <GrowthHeader
        onBack={() => navigate('/home')}
      />

      <div className="growth-main">

        {!selectedBaby && (
          <div className="babies-section">
            <div className="section-header">
              <h2>Your Babies</h2>
              <button
                className="add-button"
                onClick={() => navigate('/add-baby')}
              >
                + Add Baby
              </button>
            </div>

            {showBabyForm && (
              <BabyForm
                onSubmit={editingBaby ? handleUpdateBaby : handleAddBaby}
                isLoading={babyFormLoading}
                initialData={editingBaby}
              />
            )}

            {babies.length === 0 ? (
              <div className="empty-state">
                <p className="empty-icon">👶</p>
                <p className="empty-text">No babies added yet. Click "Add Baby" to get started!</p>
              </div>
            ) : (
              <div className="babies-list">
                {babies.map(baby => (
                  <BabyCard
                    key={baby.id}
                    baby={baby}
                    onEdit={handleEditBaby}
                    onDelete={handleDeleteBaby}
                    onViewGrowth={(babyId) => {
                      const baby = babies.find(b => b.id === babyId);
                      setSelectedBaby(baby);
                      fetchGrowthRecords(babyId);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {selectedBaby && (
          <div className="tracking-section">
            <div className="section-header">
              <div className="tracking-header-left">
                <button className="growth-back-btn" onClick={handleBackToBabies}>←</button>
                <h2>📈 {selectedBaby.name}</h2>
              </div>
              <button
                className="add-button"
                onClick={() => {
                  setEditingRecord(null);
                  setShowGrowthInput(!showGrowthInput);
                }}
              >
                {showGrowthInput ? '✕ Cancel' : '+ Record Measurement'}
              </button>
            </div>

            {showGrowthInput && (
              <GrowthInput
                babyId={selectedBaby.id}
                babyDOB={selectedBaby.date_of_birth}
                onSubmit={editingRecord ? handleUpdateGrowthRecord : handleAddGrowthRecord}
                isLoading={growthInputLoading}
                onCancel={handleCancelGrowthInput}
                initialData={editingRecord}
              />
            )}

            {growthRecords.length > 0 && (
              <>
                <div className="current-stats-card">
                  <div className="current-stat-item">
                    <div className="current-stat-emoji">⬆️</div>
                    <div className="current-stat-content">
                      <h3>Current Weight</h3>
                      <p className="current-stat-value">{latestRecord.weight_kg} kg</p>
                      <p>{new Date(latestRecord.date).toLocaleDateString()}</p>
                      {latestWho?._skip ? (
                        <p className="who-hint">⚙️ Set baby gender for WHO percentiles</p>
                      ) : latestWho?.weight_kg && (
                        <p>
                          <span className="who-badge" style={{ backgroundColor: latestWho.weight_kg.color }}>
                            {latestWho.weight_kg.category} (p{latestWho.weight_kg.percentile})
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="current-stat-item">
                    <div className="current-stat-emoji">📏</div>
                    <div className="current-stat-content">
                      <h3>Current Height</h3>
                      <p className="current-stat-value">{latestRecord.height_cm} cm</p>
                      <p>Age: {_calculateAge(selectedBaby.date_of_birth)}</p>
                      {latestWho?._skip ? (
                        <p className="who-hint">⚙️ Set baby gender for WHO percentiles</p>
                      ) : latestWho?.height_cm && (
                        <p>
                          <span className="who-badge" style={{ backgroundColor: latestWho.height_cm.color }}>
                            {latestWho.height_cm.category} (p{latestWho.height_cm.percentile})
                          </span>
                        </p>
                      )}
                    </div>
                  </div>

                  {trendAnalysis && trendAnalysis.length > 0 && (
                    <div className="trend-section">
                      {trendAnalysis.map((trend, i) => (
                        <div key={i} className={`trend-indicator trend-${trend.direction}`}>
                          {trend.text}
                        </div>
                      ))}
                    </div>
                  )}
                  {growthRecords.length === 1 && (
                    <div className="trend-empty">
                      More measurements are needed for trend analysis.
                    </div>
                  )}
                </div>

                <div className="growth-chart-card">
                  <div className="growth-chart-header">
                    <h3>{metric.icon} {metric.label} Progress</h3>
                    <div className="growth-metric-toggle">
                      <button
                        className={`metric-btn ${chartMetric === 'weight' ? 'active' : ''}`}
                        onClick={() => setChartMetric('weight')}
                      >
                        Weight
                      </button>
                      <button
                        className={`metric-btn ${chartMetric === 'height' ? 'active' : ''}`}
                        onClick={() => setChartMetric('height')}
                      >
                        Height
                      </button>

                    </div>
                  </div>
                  {chartValues.length > 0 ? (
                    <div className="growth-line-chart">
                      <svg viewBox="0 0 300 140" className="growth-line-svg" role="img" aria-label={`${metric.label} trend`}>
                        <path className="growth-line" d={buildLinePath(chartValues)} />
                        {chartValues.map((point, index) => {
                          const width = 300;
                          const height = 140;
                          const padding = 12;
                          const stepX = (width - padding * 2) / Math.max(chartValues.length - 1, 1);
                          const x = padding + index * stepX;
                          const y = height - padding - ((point.value - chartMin) / chartRange) * (height - padding * 2);
                          return (
                            <circle
                              key={`${point.date}-${index}`}
                              className="growth-line-point"
                              cx={x}
                              cy={y}
                              r="3"
                            />
                          );
                        })}
                      </svg>
                      <div className="growth-line-meta">
                        <span>{chartValues[0].date}</span>
                        <span>{chartValues[chartValues.length - 1].date}</span>
                      </div>
                      <div className="growth-line-value">
                        Latest: {chartValues[chartValues.length - 1].value} {metric.unit}
                      </div>
                    </div>
                  ) : (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                      No growth records yet. Add your first measurement!
                    </p>
                  )}
                </div>

                <div className="growth-records-card">
                  <h3>📋 All Measurements</h3>
                  {growthRecords.length > 0 ? (
                    <div className="records-table">
                      <div className="table-header">
                        <div className="table-cell">Date</div>
                        <div className="table-cell">Weight (kg)</div>
                        <div className="table-cell">Height (cm)</div>
                        <div className="table-cell">Actions</div>
                      </div>
                      {growthRecords.map(record => {
                        const who = record.who_analysis;
                        return (
                          <div key={record.id} className="table-row">
                            <div className="table-cell">
                              {new Date(record.date).toLocaleDateString()}
                            </div>
                            <div className="table-cell">
                              {record.weight_kg}
                              {who?._skip ? (
                                <div style={{ fontSize: '10px', color: '#9ba4b5' }}>Set gender</div>
                              ) : who?.weight_kg && (
                                <div><span className="who-badge" style={{ backgroundColor: who.weight_kg.color, fontSize: '10px' }}>{who.weight_kg.category}</span></div>
                              )}
                            </div>
                            <div className="table-cell">
                              {record.height_cm}
                              {who?._skip ? (
                                <div style={{ fontSize: '10px', color: '#9ba4b5' }}>Set gender</div>
                              ) : who?.height_cm && (
                                <div><span className="who-badge" style={{ backgroundColor: who.height_cm.color, fontSize: '10px' }}>{who.height_cm.category}</span></div>
                              )}
                            </div>
                            <div className="table-cell">
                              <div className="action-buttons">
                                <button
                                  className="edit-btn"
                                  onClick={() => handleEditGrowthRecord(record)}
                                  title="Edit"
                                >
                                  ✏️
                                </button>
                                <button
                                  className="delete-btn"
                                  onClick={() => handleDeleteGrowthRecord(record.id)}
                                  title="Delete"
                                >
                                  🗑
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
                      No measurements recorded yet.
                    </p>
                  )}
                </div>
                <div ref={recordsEndRef} />
              </>
            )}

            <DevelopmentalMilestones
              selectedBaby={selectedBaby}
              babyAgeMonths={calculateBabyAgeDetailed(selectedBaby.date_of_birth).months ?? 0}
            />

            {growthRecords.length === 0 && !showGrowthInput && (
              <div className="empty-state">
                <p className="empty-icon">📊</p>
                <p className="empty-text">No growth measurements yet. Click "Record Measurement" to add the first one!</p>
              </div>
            )}
          </div>
        )}

      </div>

      <BottomNavigation activeTab="Growth" />

      <button className="growth-info-btn" onClick={() => setShowInfoModal(true)} title="Growth Standards Info">i</button>

      {showInfoModal && (
        <div className="growth-info-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="growth-info-modal" onClick={(e) => e.stopPropagation()}>
            <h2>📊 Growth Tracking Standards</h2>

            <h3>WHO Child Growth Standards</h3>
            <p>
              NutriTrack uses the <strong>WHO Child Growth Standards</strong> (Multicentre Growth Reference Study)
              to evaluate your baby's growth. These standards are based on healthy breastfed infants from
              diverse ethnic backgrounds across six countries.
            </p>

            <h3>What the Percentiles Mean</h3>
            <p>
              A percentile value tells you where your baby ranks compared to other healthy babies of the same
              age and gender. For example, a weight at the 60th percentile means your baby weighs more than
              60% of peers.
            </p>

            <h3>Growth Categories</h3>
            <ul>
              <li><strong style={{ color: '#22c55e' }}>Normal</strong> (p3–p50) — Healthy growth range</li>
              <li><strong style={{ color: '#eab308' }}>Above Average</strong> (p50–p98) — Above typical range</li>
                <li><strong style={{ color: '#f97316' }}>Underweight / Stunted</strong> (p{'\u003C'}3) — Below typical range</li>
              <li><strong style={{ color: '#ef4444' }}>Severe</strong> — Requires medical attention</li>
            </ul>

            <h3>How to Use This Tracker</h3>
            <p>
              Record your baby's weight and height weekly. The chart shows progress over time, while
              WHO badges indicate growth category. Trend arrows show change since the last measurement.
              More data points give a clearer growth picture.
            </p>

            <button className="growth-info-close" onClick={() => setShowInfoModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
