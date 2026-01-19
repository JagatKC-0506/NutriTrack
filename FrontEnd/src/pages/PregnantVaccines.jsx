/**
 * PREGNANT VACCINES/HEALTH PAGE COMPONENT
 * =======================================
 * Information page for prenatal health, vaccinations, and checkups
 * Specifically designed for pregnant users
 * Clean, minimal layout with essential health information
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';
import { getCurrentUser } from '../api';
import '../styles/Vaccines.css';

const DAY_MS = 24 * 60 * 60 * 1000;

const calculateTrimester = (dueDateString) => {
  if (!dueDateString) return { trimester: 'Unknown', weeksPregnant: null };

  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) return { trimester: 'Unknown', weeksPregnant: null };

  const today = new Date();
  const normalizedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const estimatedLmp = new Date(dueDate.getTime() - 280 * DAY_MS);
  const normalizedLmp = new Date(estimatedLmp.getFullYear(), estimatedLmp.getMonth(), estimatedLmp.getDate());

  const daysPregnant = Math.floor((normalizedToday - normalizedLmp) / DAY_MS);
  if (daysPregnant < 0) return { trimester: 'Unknown', weeksPregnant: 0 };

  const weeksPregnant = Math.min(40, Math.floor(daysPregnant / 7));

  if (weeksPregnant < 13) {
    return { trimester: 'Trimester 1', weeksPregnant };
  }
  if (weeksPregnant < 28) {
    return { trimester: 'Trimester 2', weeksPregnant };
  }
  return { trimester: 'Trimester 3', weeksPregnant };
};

export default function PregnantVaccines() {
  const navigate = useNavigate();
  const [currentTrimester, setCurrentTrimester] = useState('Unknown');
  const [weeksPregnant, setWeeksPregnant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [motherVaccines, setMotherVaccines] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        const { trimester, weeksPregnant: weeks } = calculateTrimester(user.due_date);
        setCurrentTrimester(trimester);
        setWeeksPregnant(weeks);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMotherVaccines = async () => {
      try {
        const response = await fetch('/api/vaccines/mother');
        if (!response.ok) throw new Error('Failed to fetch mother vaccines');
        const vaccines = await response.json();
        setMotherVaccines(vaccines);
      } catch (error) {
        console.error('Error fetching mother vaccines:', error);
      }
    };

    fetchUserData();
    fetchMotherVaccines();
  }, []);

  // Pregnancy health checklist based on trimester
  const healthChecklistByTrimester = {
    'Trimester 1': [
      { week: '8-12 weeks', task: 'First prenatal visit with healthcare provider', icon: '👨‍⚕️', completed: false },
      { week: '8-10 weeks', task: 'Ultrasound to confirm pregnancy', icon: '📸', completed: false },
      { week: '9-13 weeks', task: 'Nuchal translucency screening (optional)', icon: '📊', completed: false },
      { week: 'Throughout', task: 'Take prenatal vitamins with folic acid', icon: '💊', completed: false }
    ],
    'Trimester 2': [
      { week: '15-20 weeks', task: 'Quad screen or cell-free DNA test (optional)', icon: '🧪', completed: false },
      { week: '18-22 weeks', task: 'Anatomy ultrasound - detailed fetal exam', icon: '📸', completed: false },
      { week: '24-28 weeks', task: 'Glucose screening test', icon: '🧬', completed: false },
      { week: '28 weeks', task: 'RhoGAM injection (if Rh negative)', icon: '💉', completed: false }
    ],
    'Trimester 3': [
      { week: '36 weeks', task: 'Group B Streptococcus (GBS) test', icon: '🧪', completed: false },
      { week: '36+ weeks', task: 'Weekly prenatal visits', icon: '👨‍⚕️', completed: false },
      { week: 'Weekly', task: 'Monitor baby movements (kick counts)', icon: '👶', completed: false },
      { week: '37-40 weeks', task: 'Cervical exams to check progress', icon: '📋', completed: false }
    ],
    'Unknown': [
      { week: 'Contact healthcare provider', task: 'Schedule your first prenatal appointment', icon: '📞', completed: false }
    ]
  };

  // Separate vaccines into recommended and to avoid categories
  const recommendedVaccinesDB = motherVaccines.filter(v => v.recommended && v.emoji !== '⚠️');
  const vaccinesToAvoidDB = motherVaccines.filter(v => v.emoji === '⚠️' || !v.recommended);

  const currentChecklist = healthChecklistByTrimester[currentTrimester] || healthChecklistByTrimester['Unknown'];

  if (loading) {
    return (
      <div className="vaccines-container">
        <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>
        <BottomNavigation activeTab="Vaccines" userType="pregnant" />
      </div>
    );
  }

  return (
    <div className="vaccines-container">
      {/* Header */}
      <div className="vaccines-header">
        <h1>🤰 Prenatal Health & Vaccines</h1>
        <p>{currentTrimester} {weeksPregnant && `- Week ${weeksPregnant}`}</p>
      </div>

      {/* Main Content */}
      <div className="vaccines-content">
        
        {/* Trimester Checklist */}
        <section className="health-section">
          <h2>✅ {currentTrimester} Checklist</h2>
          <div className="checklist-container">
            {currentChecklist.map((item, index) => (
              <div key={index} className="checklist-item">
                <div className="checklist-header">
                  <span className="icon">{item.icon}</span>
                  <div className="checklist-info">
                    <h4>{item.task}</h4>
                    <span className="week-info">{item.week}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Vaccines */}
        <section className="health-section">
          <h2>💉 Recommended Vaccines During Pregnancy</h2>
          {recommendedVaccinesDB.length > 0 ? (
            <div className="vaccine-cards-container">
              {recommendedVaccinesDB.map((vaccine) => (
                <div key={vaccine.id} className="vaccine-card safe">
                  <div className="vaccine-card-header">
                    <span className="vaccine-icon">{vaccine.emoji}</span>
                    <h3>{vaccine.name}</h3>
                  </div>
                  <div className="vaccine-card-body">
                    <p><strong>Description:</strong> {vaccine.description}</p>
                    {vaccine.total_doses && (
                      <p><strong>Doses:</strong> {vaccine.total_doses}</p>
                    )}
                    <span className="safe-badge">✓ Recommended During Pregnancy</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>Loading vaccines...</p>
          )}
        </section>

        {/* Vaccines to Avoid */}
        <section className="health-section">
          <h2>⚠️ Vaccines to Avoid During Pregnancy</h2>
          {vaccinesToAvoidDB.length > 0 ? (
            <div className="vaccine-cards-container">
              {vaccinesToAvoidDB
                .filter(v => v.emoji === '⚠️')
                .map((vaccine) => (
                  <div key={vaccine.id} className="vaccine-card unsafe">
                    <div className="vaccine-card-header">
                      <span className="vaccine-icon">{vaccine.emoji}</span>
                      <h3>{vaccine.name}</h3>
                    </div>
                    <div className="vaccine-card-body">
                      <p><strong>Reason:</strong> {vaccine.description}</p>
                      <span className="unsafe-badge">⚠️ Avoid During Pregnancy</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p style={{ color: 'var(--text-muted)' }}>No vaccines to avoid in database.</p>
          )}
        </section>

        {/* Important Note */}
        <section className="health-section important-note">
          <h2>📌 Important Reminders</h2>
          <ul className="important-list">
            <li>Always consult with your healthcare provider before getting any vaccine</li>
            <li>Keep your vaccination records up to date</li>
            <li>Schedule prenatal visits regularly</li>
            <li>Report any concerns or symptoms to your doctor immediately</li>
            <li>Many vaccines are safe and recommended during pregnancy</li>
          </ul>
        </section>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
