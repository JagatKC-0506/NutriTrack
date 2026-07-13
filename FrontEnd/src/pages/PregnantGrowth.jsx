import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import GrowthHeader from '../components/GrowthHeader';
import GrowthInput from './GrowthInput';
import BottomNavigation from '../components/BottomNavigation';
import { useToast } from '../context/ToastContext';
import {
  getCurrentUser,
  getPregnancyWeightRecords,
  createPregnancyWeightRecord,
  deletePregnancyWeightRecord,
  updatePregnancyWeightRecord,
} from '../api';
import '../styles/Growth.css';

// Weight gain recommendations by height and BMI category (in lbs)
const WEIGHT_GAIN_CHART = {
  "4'7": { underweight: [100, 120], normal: [90, 108], overweight: [75, 95], obese: [60, 85] },
  "4'8": { underweight: [102, 122], normal: [92, 110], overweight: [77, 97], obese: [62, 87] },
  "4'9": { underweight: [104, 124], normal: [94, 112], overweight: [79, 99], obese: [64, 89] },
  "4'10": { underweight: [106, 126], normal: [96, 114], overweight: [81, 101], obese: [66, 91] },
  "4'11": { underweight: [108, 128], normal: [98, 116], overweight: [83, 103], obese: [68, 93] },
  "5'0": { underweight: [110, 130], normal: [100, 118], overweight: [85, 105], obese: [70, 95] },
  "5'1": { underweight: [112, 132], normal: [102, 120], overweight: [87, 107], obese: [72, 97] },
  "5'2": { underweight: [114, 134], normal: [104, 122], overweight: [89, 109], obese: [74, 99] },
  "5'3": { underweight: [116, 136], normal: [106, 124], overweight: [91, 111], obese: [76, 101] },
  "5'4": { underweight: [118, 138], normal: [108, 126], overweight: [93, 113], obese: [78, 103] },
  "5'5": { underweight: [120, 140], normal: [110, 128], overweight: [95, 115], obese: [80, 105] },
  "5'6": { underweight: [122, 142], normal: [112, 130], overweight: [97, 117], obese: [82, 107] },
  "5'7": { underweight: [124, 144], normal: [114, 132], overweight: [99, 119], obese: [84, 109] },
  "5'8": { underweight: [126, 146], normal: [116, 134], overweight: [101, 121], obese: [86, 111] },
  "5'9": { underweight: [128, 148], normal: [118, 136], overweight: [103, 123], obese: [88, 113] },
  "5'10": { underweight: [130, 150], normal: [120, 138], overweight: [105, 125], obese: [90, 115] },
  "5'11": { underweight: [132, 152], normal: [122, 140], overweight: [107, 127], obese: [92, 117] },
  "6'0": { underweight: [134, 154], normal: [124, 142], overweight: [109, 129], obese: [94, 119] },
};

const HEIGHTS_ARRAY = ["4'7", "4'8", "4'9", "4'10", "4'11", "5'0", "5'1", "5'2", "5'3", "5'4", "5'5", "5'6", "5'7", "5'8", "5'9", "5'10", "5'11", "6'0"];

const standardGainByWeek = {};
for (let w = 1; w <= 42; w++) {
  let gain = 0;
  if (w <= 12) gain = (w / 12) * 2;
  else gain = 2 + ((w - 12) / 28) * 10.5;
  standardGainByWeek[w] = gain;
};

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

function heightToKey(heightInches) {
  const feet = Math.floor(heightInches / 12);
  const inches = heightInches % 12;
  return `${feet}'${inches}`;
}

function calculateBMI(weightLbs, heightInches) {
  return (weightLbs / (heightInches * heightInches)) * 703;
}

function cmToInches(cm) { return cm / 2.54; }
function kgToLbs(kg) { return kg * 2.20462; }

export default function PregnantGrowth() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress');
  const [showGrowthInput, setShowGrowthInput] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [growthInputLoading, setGrowthInputLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showReferenceTab, setShowReferenceTab] = useState(false);
  const recordsEndRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [userData, recordsData] = await Promise.all([
        getCurrentUser(),
        getPregnancyWeightRecords().catch(() => [])
      ]);
      setUser(userData);
      setRecords(recordsData || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (recordData) => {
    setGrowthInputLoading(true);
    try {
      await createPregnancyWeightRecord(recordData);
      setShowGrowthInput(false);
      loadData();
      addToast('Weight record added successfully!', 'success');
      setTimeout(() => recordsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error('Error adding record:', error);
      addToast('Failed to add record: ' + error.message, 'error');
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
      await updatePregnancyWeightRecord(editingRecord.id, recordData);
      setShowGrowthInput(false);
      setEditingRecord(null);
      loadData();
      addToast('Weight record updated successfully!', 'success');
      setTimeout(() => recordsEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (error) {
      console.error('Error updating record:', error);
      addToast('Failed to update record: ' + error.message, 'error');
    } finally {
      setGrowthInputLoading(false);
    }
  };

  const handleDeleteRecord = async (recordId) => {
    if (window.confirm('Are you sure you want to delete this weight record?')) {
      try {
        await deletePregnancyWeightRecord(recordId);
        setRecords(prev => prev.filter(r => r.id !== recordId));
        addToast('Weight record deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting record:', error);
        addToast('Failed to delete record: ' + error.message, 'error');
      }
    }
  };

  const handleCancelGrowthInput = () => {
    setShowGrowthInput(false);
    setEditingRecord(null);
  };

  const handleToggleReference = () => {
    const nextVal = !showReferenceTab;
    setShowReferenceTab(nextVal);
    if (!nextVal && activeTab === 'chart') {
      setActiveTab('progress');
    }
  };

  const getUserRecommendation = () => {
    if (!user?.height_cm || !user?.pre_pregnancy_weight_kg) return null;
    const heightInches = cmToInches(user.height_cm);
    const weightLbs = kgToLbs(user.pre_pregnancy_weight_kg);
    const bmi = calculateBMI(weightLbs, heightInches);
    const category = getBMICategory(bmi);
    const heightKey = heightToKey(Math.round(heightInches));
    const range = WEIGHT_GAIN_CHART[heightKey]?.[category];
    if (!range) return null;
    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      minGainKg: Math.round(range[0] * 0.453592 * 10) / 10,
      maxGainKg: Math.round(range[1] * 0.453592 * 10) / 10,
    };
  };

  const getCurrentGain = () => {
    if (!user?.pre_pregnancy_weight_kg || records.length === 0) return null;
    const latest = records[records.length - 1];
    return Math.round((latest.weight_kg - user.pre_pregnancy_weight_kg) * 10) / 10;
  };

  const buildDualChartPaths = () => {
    const defaultMin = user?.pre_pregnancy_weight_kg ? user.pre_pregnancy_weight_kg * 0.95 : 50;
    const defaultMax = user?.pre_pregnancy_weight_kg ? user.pre_pregnancy_weight_kg * 1.2 : 100;
    if (records.length === 0) return { userPath: '', standardPath: '', chartMin: defaultMin, chartMax: defaultMax, range: defaultMax - defaultMin };

    const prePregnancyWeight = user?.pre_pregnancy_weight_kg;
    const standardAbsoluteWeights = prePregnancyWeight 
      ? records.map(r => ({ week: r.week, weight_kg: prePregnancyWeight + (standardGainByWeek[r.week] || 0) }))
      : [];

    const allWeights = [...records.map(r => r.weight_kg), ...standardAbsoluteWeights.map(r => r.weight_kg)];
    const minW = Math.min(...allWeights) * 0.95;
    const maxW = Math.max(...allWeights) * 1.05;
    const range = maxW - minW || 1;

    const mapToPoints = (data) => data.map(r => {
      const x = 12 + ((r.week - 1) / 41) * 276; 
      const y = 128 - ((r.weight_kg - minW) / range) * 116; 
      return `${x},${y}`;
    });

    return {
      userPath: records.length >= 2 ? `M${mapToPoints(records).join(' L')}` : '',
      standardPath: standardAbsoluteWeights.length >= 2 ? `M${mapToPoints(standardAbsoluteWeights).join(' L')}` : '',
      chartMin: minW, chartMax: maxW, range
    };
  };

  const recommendation = getUserRecommendation();
  const currentGain = getCurrentGain();
  const chartData = buildDualChartPaths();

  if (loading) {
    return (
      <div className="growth-container">
        <GrowthHeader onBack={() => navigate('/pregnant/home')} />
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
      <GrowthHeader onBack={() => navigate('/pregnant/home')} />

      <div className="growth-main">
        
        {recommendation ? (
          <div className="current-stats-card">
            <div className="current-stat-item">
              <div className="current-stat-emoji">⚖️</div>
              <div className="current-stat-content">
                <h3>Pre-Pregnancy BMI</h3>
                <p className="current-stat-value">{recommendation.bmi} ({recommendation.category})</p>
              </div>
            </div>
            <div className="current-stat-item">
              <div className="current-stat-emoji">🎯</div>
              <div className="current-stat-content">
                <h3>Recommended Gain</h3>
                <p className="current-stat-value">{recommendation.minGainKg} - {recommendation.maxGainKg} kg</p>
              </div>
            </div>
            {currentGain !== null && (
              <div className="current-stat-item">
                <div className="current-stat-emoji">📈</div>
                <div className="current-stat-content">
                  <h3>Your Current Gain</h3>
                  <p className="current-stat-value" style={{ color: (currentGain >= recommendation.minGainKg && currentGain <= recommendation.maxGainKg) ? 'var(--success-green)' : '#ef4444' }}>
                    {currentGain} kg
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="empty-state" style={{ margin: 0 }}>
            <p className="empty-icon">⚙️</p>
            <p className="empty-text">Add your height and pre-pregnancy weight in Profile to see personalized recommendations.</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <div className="growth-tabs" style={{ flex: 1, marginBottom: 0 }}>
            <button className={`growth-tab-btn ${activeTab === 'progress' ? 'active' : ''}`} onClick={() => setActiveTab('progress')}>My Progress</button>
            {showReferenceTab && (
              <button className={`growth-tab-btn ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveTab('chart')}>Reference Chart</button>
            )}
          </div>
          <button onClick={handleToggleReference} className="add-button" style={{ padding: '8px 12px', fontSize: '12px' }}>
            {showReferenceTab ? 'Hide Ref' : 'Show Ref'}
          </button>
        </div>

        {activeTab === 'progress' && (
          <>
            <div className="section-header">
              <h2>Records</h2>
              <button className="add-button" onClick={() => { setEditingRecord(null); setShowGrowthInput(!showGrowthInput); }}>
                {showGrowthInput ? '✕ Cancel' : '+ Add Weight'}
              </button>
            </div>

            {showGrowthInput && (
              <GrowthInput 
                onSubmit={editingRecord ? handleUpdateGrowthRecord : handleAddRecord}
                isLoading={growthInputLoading}
                onCancel={handleCancelGrowthInput}
                initialData={editingRecord}
                lastWeek={records.length > 0 ? records[records.length - 1].week : null}
              />
            )}

            {records.length > 0 && (
              <div className="growth-chart-card">
                <div className="growth-chart-header">
                  <h3>📈 Weight Progress</h3>
                </div>
                <div className="growth-line-chart">
                  <svg viewBox="0 0 300 140" className="growth-line-svg">
                    {chartData.standardPath && <path d={chartData.standardPath} fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />}
                    <path d={chartData.userPath} fill="none" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    {records.map((r, i) => {
                      const x = 12 + ((r.week - 1) / 41) * 276;
                      const y = 128 - ((r.weight_kg - chartData.chartMin) / chartData.range) * 116;
                      return <circle key={r.id} cx={x} cy={y} r="3.5" fill="#ec4899" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />;
                    })}
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <div style={{ width: '12px', height: '3px', background: '#ec4899', borderRadius: '2px' }}></div> You
                    </div>
                    {chartData.standardPath && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-muted)' }}>
                        <div style={{ width: '12px', height: '0px', borderTop: '2px dashed rgba(255,255,255,0.4)' }}></div> Standard
                      </div>
                    )}
                  </div>
                  <div className="growth-line-meta">
                    <span>Week {records[0].week}</span>
                    {records.length > 1 && <span>Week {records[records.length - 1].week}</span>}
                  </div>
                  <div className="growth-line-value">Latest: {records[records.length - 1].weight_kg} kg</div>
                </div>
              </div>
            )}

            {records.length > 0 ? (
              <div className="growth-records-card">
                <h3>📋 History</h3>
                <div className="records-table">
                  <div className="table-header">
                    <div className="table-cell">Week</div>
                    <div className="table-cell">Weight (kg)</div>
                    <div className="table-cell">Date</div>
                    <div className="table-cell">Actions</div>
                  </div>
                  {[...records].reverse().map(record => (
                    <div key={record.id} className="table-row">
                      <div className="table-cell">Week {record.week}</div>
                      <div className="table-cell">
                        {record.weight_kg}
                        {currentGain !== null && (
                          <div style={{ fontSize: '10px', color: 'var(--success-green)' }}>
                            +{(record.weight_kg - user.pre_pregnancy_weight_kg).toFixed(1)} kg
                          </div>
                        )}
                      </div>
                      <div className="table-cell">{record.record_date}</div>
                      <div className="table-cell">
                        <div className="action-buttons">
                          <button className="edit-btn" onClick={() => handleEditGrowthRecord(record)} title="Edit">✏️</button>
                          <button className="delete-btn" onClick={() => handleDeleteRecord(record.id)} title="Delete">🗑</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div ref={recordsEndRef} />
              </div>
            ) : (
              !showGrowthInput && (
                <div className="empty-state">
                  <p className="empty-icon">📊</p>
                  <p className="empty-text">No weight records yet. Click "Add Weight" to get started!</p>
                </div>
              )
            )}
          </>
        )}

        {activeTab === 'chart' && showReferenceTab && (
          <div className="growth-records-card">
            <h3>📏 Pregnancy Weight Gain By Height (lbs)</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 12px 0' }}>Recommended total weight gain based on pre-pregnancy BMI</p>
            <div className="records-table">
              <div className="table-header">
                <div className="table-cell">Height</div>
                <div className="table-cell">Underweight</div>
                <div className="table-cell">Normal</div>
                <div className="table-cell">Overweight</div>
                <div className="table-cell">Obese</div>
              </div>
              {HEIGHTS_ARRAY.map(h => {
                const data = WEIGHT_GAIN_CHART[h];
                return (
                  <div key={h} className="table-row">
                    <div className="table-cell" style={{ fontWeight: '600' }}>{h}</div>
                    <div className="table-cell">{data.underweight[0]}-{data.underweight[1]}</div>
                    <div className="table-cell">{data.normal[0]}-{data.normal[1]}</div>
                    <div className="table-cell">{data.overweight[0]}-{data.overweight[1]}</div>
                    <div className="table-cell">{data.obese[0]}-{data.obese[1]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      <BottomNavigation activeTab="Growth" userType="pregnant" />

      <button className="growth-info-btn" onClick={() => setShowInfoModal(true)} title="Weight Gain Info">i</button>

      {showInfoModal && (
        <div className="growth-info-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="growth-info-modal" onClick={(e) => e.stopPropagation()}>
            <h2>⚖️ Pregnancy Weight Gain</h2>
            <h3>Why Track Weight?</h3>
            <p>Gaining a healthy amount of weight during pregnancy helps protect your health and your baby's health.</p>
            <h3>The Progress Graph</h3>
            <p>The <span style={{color:'#ec4899'}}>pink line</span> shows your actual recorded weight. The <span style={{color:'rgba(255,255,255,0.6)'}}>dashed white line</span> shows the standard expected average weight gain for a normal BMI.</p>
            <h3>Disclaimer</h3>
            <p>This tool is for informational purposes. Always consult your healthcare provider for personalized medical advice regarding your pregnancy weight.</p>
            <button className="growth-info-close" onClick={() => setShowInfoModal(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}