import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { getCurrentUser, getMotherVaccines, getUserVaccineReminders, createVaccineReminder, updateVaccineReminderStatus } from '../api';
import { useToast } from '../context/ToastContext';
import { calculateTrimester, getVaccineStatus } from '../data/pregnancyUtils';
import VACCINE_ENRICHMENT from '../data/vaccineEnrichment';
import VaccineCard from '../components/pregnancy/VaccineCard';
import VaccineTimeline from '../components/pregnancy/VaccineTimeline';
import '../styles/Vaccines.css';
import '../styles/Pregnancy.css';

export default function PregnantVaccineList() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [weeksPregnant, setWeeksPregnant] = useState(0);
  const [loading, setLoading] = useState(true);
  const [motherVaccines, setMotherVaccines] = useState([]);
  const [userReminders, setUserReminders] = useState([]);
  const [trackingLoading, setTrackingLoading] = useState(false);

  const fetchReminders = useCallback(async () => {
    try {
      const reminders = await getUserVaccineReminders();
      setUserReminders(reminders.filter(r => r.recipient === 'mother') || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  }, []);

  const handleMarkDone = async (vaccine) => {
    setTrackingLoading(true);
    try {
      const existing = userReminders.find(
        r => r.vaccine_name === vaccine.name && r.status === 'completed'
      );
      if (existing) {
        addToast('Already marked as completed!', 'info');
        return;
      }
      const reminder = userReminders.find(
        r => r.vaccine_name === vaccine.name && r.status !== 'completed'
      );
      if (reminder) {
        await updateVaccineReminderStatus(reminder.id, {
          status: 'completed',
          last_dose_date: new Date().toISOString().split('T')[0],
        });
      } else {
        await createVaccineReminder({
          vaccine_name: vaccine.name,
          vaccine_icon: vaccine.emoji,
          reminder_date: new Date().toISOString().split('T')[0],
          dose_number: 1,
          total_doses: vaccine.total_doses || 1,
          recipient: 'mother',
          status: 'completed',
          last_dose_date: new Date().toISOString().split('T')[0],
        });
      }
      await fetchReminders();
      addToast(`✓ ${vaccine.name} marked as completed`, 'success');
    } catch (error) {
      addToast('Failed to update. Please try again.', 'error');
    } finally {
      setTrackingLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, vaccines] = await Promise.all([
          getCurrentUser(),
          getMotherVaccines(),
        ]);
        const { weeksPregnant: weeks } = calculateTrimester(userData.due_date);
        setWeeksPregnant(weeks);
        setMotherVaccines(vaccines);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchReminders();
  }, [fetchReminders]);

  const recommended = useMemo(
    () => motherVaccines.filter(v => v.recommended && v.emoji !== '⚠️'),
    [motherVaccines]
  );

  const vaccinesToAvoid = useMemo(
    () => motherVaccines.filter(v => v.emoji === '⚠️'),
    [motherVaccines]
  );

  const vaccinesWithStatus = useMemo(
    () => recommended.map(v => ({
      ...v,
      status: getVaccineStatus(v.name, weeksPregnant, userReminders, VACCINE_ENRICHMENT[v.name]),
      enrichment: VACCINE_ENRICHMENT[v.name] || null,
    })),
    [recommended, weeksPregnant, userReminders]
  );

  if (loading) {
    return (
      <div className="vaccines-container">
        <div className="vaccines-header">
          <button className="vaccines-header-back" onClick={() => navigate('/pregnant/vaccines')}>
            <ArrowLeft size={20} />
          </button>
          <div className="vaccines-header-content">
            <h1>Vaccine Recommendations</h1>
            <p>Loading...</p>
          </div>
        </div>
        <div className="vaccines-main">
          <div className="vaccine-loading">
            <div className="vaccine-loading-line wide" />
            <div className="vaccine-loading-line medium" />
            <div className="vaccine-loading-line" />
          </div>
        </div>
        <BottomNavigation activeTab="Vaccines" userType="pregnant" />
      </div>
    );
  }

  return (
    <div className="vaccines-container">
      <div className="vaccines-header">
        <button className="vaccines-header-back" onClick={() => navigate('/pregnant/vaccines')}>
          <ArrowLeft size={20} />
        </button>
        <div className="vaccines-header-content">
          <h1>Vaccine Recommendations</h1>
          <p>Week {weeksPregnant}</p>
        </div>
      </div>

      <div className="vaccines-main">
        <VaccineTimeline currentWeek={weeksPregnant} />

        <h2 className="pregnancy-section-title">
          <Shield size={20} />
          Recommended Vaccines
        </h2>

        <div className="vaccine-cards-new">
          {vaccinesWithStatus.map(vaccine => (
            <VaccineCard
              key={vaccine.id}
              vaccine={vaccine}
              enrichment={vaccine.enrichment}
              status={vaccine.status}
              onMarkDone={handleMarkDone}
              trackingLoading={trackingLoading}
            />
          ))}
        </div>

        {vaccinesToAvoid.length > 0 && (
          <div className="vaccines-to-avoid">
            <h3>
              <AlertTriangle size={18} />
              Vaccines to Avoid During Pregnancy
            </h3>
            <div className="vaccines-to-avoid-list">
              {vaccinesToAvoid.map(v => (
                <div key={v.id} className="vaccines-to-avoid-item">
                  <span className="vaccines-to-avoid-item-icon">{v.emoji}</span>
                  <div className="vaccines-to-avoid-item-info">
                    <h4 className="vaccines-to-avoid-item-name">{v.name}</h4>
                    <p className="vaccines-to-avoid-item-reason">{v.description}</p>
                  </div>
                  <span className="vaccines-to-avoid-item-badge">Avoid</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
