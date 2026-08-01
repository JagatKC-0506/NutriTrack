import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import VaccinesHeader from '../components/VaccinesHeader';
import VaccineCard from '../components/VaccineCard';
import KhopCard from '../components/KhopCard';
import VaccineInfoModal from '../components/VaccineInfoModal';
import AddVaccineModal from '../components/AddVaccineModal';
import BottomNavigation from '../components/BottomNavigation';
import NotificationService from '../services/NotificationService';
import { useToast } from '../context/ToastContext';
import { getCurrentUser, getMotherVaccines, getUserVaccineReminders, createVaccineReminder, updateVaccineReminderStatus, deleteVaccineReminder } from '../api';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';
import VACCINE_ENRICHMENT from '../data/vaccineEnrichment';
import '../styles/Vaccines.css';

const DAY_MS = 24 * 60 * 60 * 1000;

const WEEK_MS = 7 * DAY_MS;

function computeReminderDate(vaccineName, dueDateString, weeksPregnant) {
  const due = new Date(dueDateString);
  const lmp = new Date(due.getTime() - 280 * DAY_MS);
  const enrichment = VACCINE_ENRICHMENT[vaccineName];
  const startWeek = enrichment?.recommendedWeeks?.[0] ?? 0;
  const targetWeek = Math.max(startWeek, weeksPregnant);
  const targetDate = new Date(lmp.getTime() + targetWeek * WEEK_MS);
  return `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
}

export default function PregnantVaccines() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const { addToast } = useToast();
  const [allVaccines, setAllVaccines] = useState([]);
  const [userReminders, setUserReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dueDate, setDueDate] = useState(null);
  const [weeksPregnant, setWeeksPregnant] = useState(0);
  const [user, setUser] = useState(null);
  const [showKhopCard, setShowKhopCard] = useState(false);
  const [infoVaccine, setInfoVaccine] = useState(null);
  const [lastAutoCreatedDose, setLastAutoCreatedDose] = useState(null);
  const [showAddVaccine, setShowAddVaccine] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, vaccinesData, remindersData] = await Promise.all([
          getCurrentUser(),
          getMotherVaccines(),
          getUserVaccineReminders().catch(() => []),
        ]);

        const motherReminders = (remindersData || []).filter(r => r.recipient === 'mother');
        setAllVaccines(vaccinesData || []);
        setUserReminders(motherReminders || []);
        setDueDate(userData?.due_date || null);
        setUser(userData || null);

        let currentWeeks = 0;
        if (userData?.due_date) {
          const due = new Date(userData.due_date);
          const lmp = new Date(due.getTime() - 280 * DAY_MS);
          const today = new Date();
          const daysPregnant = Math.floor((today - lmp) / DAY_MS);
          currentWeeks = Math.max(0, Math.min(40, Math.floor(daysPregnant / 7)));
          setWeeksPregnant(currentWeeks);
        }

        // Auto-create reminders for mother vaccines that don't have them yet
        const vaccinesWithReminders = new Set(motherReminders.map(r => r.vaccine_name));
        const vaccinesNeedingReminders = (vaccinesData || []).filter(
          v => v.recipient_type === 'mother' && v.emoji !== '⚠️' && !vaccinesWithReminders.has(v.name)
        );
        if (vaccinesNeedingReminders.length > 0 && userData?.due_date) {
          const created = [];
          for (const vaccine of vaccinesNeedingReminders) {
            try {
              const reminder = await createVaccineReminder({
                vaccine_name: vaccine.name,
                vaccine_icon: vaccine.emoji,
                reminder_date: computeReminderDate(vaccine.name, userData.due_date, currentWeeks),
                dose_number: 1,
                total_doses: vaccine.total_doses || 1,
                recipient: 'mother',
              });
              created.push(reminder);
            } catch (error) {
              console.error(`Error creating reminder for ${vaccine.name}:`, error);
            }
          }
          if (created.length > 0) {
            setUserReminders(prev => [...prev, ...created]);
          }
        }
      } catch (error) {
        console.error('Error fetching vaccine data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const isDueWithinWeek = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const daysRemaining = Math.ceil((dueDate - today) / DAY_MS);
    return daysRemaining > 0 && daysRemaining <= 7;
  };

  const getDisplayStatus = (reminder) => {
    if (reminder.status === 'completed') return 'completed';
    if (reminder.reminder_date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const due = new Date(reminder.reminder_date);
      if (due < today) return 'overdue';
    }
    return 'pending';
  };

  const displayVaccines = useMemo(() => {
    const vaccinesWithReminders = new Set(userReminders.map(r => r.vaccine_name));

    const list = userReminders.map(reminder => {
      const originalVaccine = allVaccines.find(v => v.name === reminder.vaccine_name);
      return {
        ...reminder,
        recommended: originalVaccine?.recommended || false,
        status: getDisplayStatus(reminder),
      };
    });

    allVaccines.forEach(vaccine => {
      if (vaccine.recipient_type !== 'mother' || vaccine.emoji === '⚠️') return;
      if (!vaccinesWithReminders.has(vaccine.name)) {
        list.push({
          id: `available-${vaccine.id || vaccine.name}`,
          vaccine_name: vaccine.name,
          vaccine_icon: vaccine.emoji,
          description: vaccine.description,
          reminder_date: dueDate ? computeReminderDate(vaccine.name, dueDate, weeksPregnant) : '',
          status: 'available',
          recipient: 'mother',
          total_doses: vaccine.total_doses || 1,
          dose_number: 0,
          recommended: vaccine.recommended,
        });
      }
    });

    return list;
  }, [userReminders, allVaccines, dueDate, weeksPregnant]);

  const filteredVaccines = useMemo(() => {
    if (activeTab === 'completed') {
      return displayVaccines.filter(v => v.status === 'completed');
    }
    const nonCompleted = displayVaccines.filter(v => v.status !== 'completed');
    if (activeTab === 'recommended') {
      return nonCompleted.filter(v => v.recommended === true);
    }
    return nonCompleted;
  }, [displayVaccines, activeTab]);

  const vaccinesToAvoid = useMemo(
    () => allVaccines.filter(v => v.recipient_type === 'mother' && v.emoji === '⚠️'),
    [allVaccines]
  );

  const stats = useMemo(() => ({
    completed: displayVaccines.filter(v => v.status === 'completed').length,
    pending: displayVaccines.filter(v => v.status !== 'completed').length,
    overdue: displayVaccines.filter(v => v.status === 'overdue').length,
  }), [displayVaccines]);

  const handleMarkDone = async (id) => {
    try {
      const vaccineToMark = userReminders.find(v => v.id === id);
      if (!vaccineToMark) return;

      const updatedReminders = userReminders.map(reminder =>
        reminder.id === id
          ? {
              ...reminder,
              status: 'completed',
              last_dose_date: new Date().toISOString().split('T')[0],
            }
          : reminder
      );
      setUserReminders(updatedReminders);

      await updateVaccineReminderStatus(id, {
        status: 'completed',
        last_dose_date: new Date().toISOString(),
      });

      if ('Notification' in window && Notification.permission === 'granted') {
        NotificationService.sendNotification(
          `✓ ${vaccineToMark.vaccine_name} Completed`,
          {
            body: `Great! You've completed the ${vaccineToMark.vaccine_name} vaccine.`,
            tag: `vaccine-completed-${id}`,
            icon: '✓'
          }
        );
      }

      const currentDose = vaccineToMark.dose_number || 1;
      const totalDoses = vaccineToMark.total_doses || 1;

      if (currentDose < totalDoses) {
        const nextDoseExists = updatedReminders.some(
          r => r.vaccine_name === vaccineToMark.vaccine_name && r.dose_number === currentDose + 1
        );

        if (!nextDoseExists) {
          const baseDate = vaccineToMark.last_dose_date || vaccineToMark.reminder_date || new Date().toISOString().split('T')[0];
          const nextDate = new Date(baseDate);
          nextDate.setDate(nextDate.getDate() + 28);
          const nextDoseDate = `${nextDate.getFullYear()}-${String(nextDate.getMonth() + 1).padStart(2, '0')}-${String(nextDate.getDate()).padStart(2, '0')}`;

          const nextDoseReminder = {
            vaccine_name: vaccineToMark.vaccine_name,
            reminder_date: nextDoseDate,
            dose_number: currentDose + 1,
            total_doses: totalDoses,
            recipient: 'mother',
            description: vaccineToMark.description,
            vaccine_icon: vaccineToMark.vaccine_icon,
          };

          const newDose = await createVaccineReminder(nextDoseReminder);
          setLastAutoCreatedDose({ doseId: newDose.id, vaccineName: vaccineToMark.vaccine_name, doseNumber: currentDose + 1 });
          setUserReminders(prev => [...prev, newDose]);

          if ('Notification' in window && Notification.permission === 'granted') {
            NotificationService.sendNotification(
              `${vaccineToMark.vaccine_name} - Dose ${currentDose + 1} Scheduled`,
              {
                body: `Reminder set for ${nextDoseDate}`,
                tag: `vaccine-next-dose-${vaccineToMark.vaccine_name}-${currentDose + 1}`,
              }
            );
          }
        }
      }

      const refreshedReminders = await getUserVaccineReminders().catch(() => []);
      setUserReminders((refreshedReminders || []).filter(r => r.recipient === 'mother'));
    } catch (error) {
      console.error('Error marking vaccine as done:', error);
      try {
        const refreshedReminders = await getUserVaccineReminders().catch(() => []);
        setUserReminders((refreshedReminders || []).filter(r => r.recipient === 'mother'));
      } catch (refreshError) {
        console.error('Error refreshing vaccine reminders after failure:', refreshError);
      }
    }
  };

  const handleUndoDone = async (id) => {
    try {
      const vaccineToUndo = userReminders.find(v => v.id === id);
      if (!vaccineToUndo) return;

      const revertedStatus = (() => {
        const due = new Date(vaccineToUndo.reminder_date);
        const today = new Date();
        const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        return due < todayStart ? 'overdue' : 'upcoming';
      })();

      const updatedReminders = userReminders.map(reminder =>
        reminder.id === id
          ? { ...reminder, status: revertedStatus, last_dose_date: null }
          : reminder
      );
      setUserReminders(updatedReminders);

      await updateVaccineReminderStatus(id, {
        status: revertedStatus,
        last_dose_date: null,
      });

      const autoDose = lastAutoCreatedDose;
      if (autoDose && autoDose.vaccineName === vaccineToUndo.vaccine_name) {
        const autoReminder = updatedReminders.find(r => r.id === autoDose.doseId);
        if (autoReminder && autoReminder.status !== 'completed') {
          await deleteVaccineReminder(autoDose.doseId).catch(() => {});
          setUserReminders(prev => prev.filter(r => r.id !== autoDose.doseId));
        }
        setLastAutoCreatedDose(null);
      }

      const refreshedReminders = await getUserVaccineReminders().catch(() => []);
      setUserReminders((refreshedReminders || []).filter(r => r.recipient === 'mother'));

      addToast(`↩ ${vaccineToUndo.vaccine_name} marked as not done`, 'info');
    } catch (error) {
      console.error('Error undoing vaccine completion:', error);
      try {
        const refreshedReminders = await getUserVaccineReminders().catch(() => []);
        setUserReminders((refreshedReminders || []).filter(r => r.recipient === 'mother'));
      } catch (refreshError) {
        console.error('Error refreshing vaccine reminders after undo failure:', refreshError);
      }
      addToast('Failed to undo. Please try again.', 'error');
    }
  };

  const handleAddVaccine = async (vaccineData) => {
    const created = await createVaccineReminder(vaccineData);
    const refreshed = await getUserVaccineReminders().catch(() => []);
    setUserReminders((refreshed || []).filter(r => r.recipient === 'mother'));
    addToast(`✓ ${created.vaccine_name} added`, 'success');
  };

  const handleDeleteVaccine = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await deleteVaccineReminder(id);
      const refreshed = await getUserVaccineReminders().catch(() => []);
      setUserReminders((refreshed || []).filter(r => r.recipient === 'mother'));
      addToast(`🗑️ ${name} deleted`, 'info');
    } catch (error) {
      console.error('Error deleting vaccine:', error);
      addToast('Failed to delete vaccine', 'error');
    }
  };

  const handleManualAutoSetup = async () => {
    setLoading(true);
    try {
      const vaccinesWithReminders = new Set(userReminders.map(r => r.vaccine_name));
      const vaccinesNeedingReminders = allVaccines.filter(
        v => v.recipient_type === 'mother' && v.emoji !== '⚠️' && !vaccinesWithReminders.has(v.name)
      );
      if (vaccinesNeedingReminders.length === 0) {
        addToast('All vaccines already have reminders', 'info');
        return;
      }
      const created = [];
      for (const vaccine of vaccinesNeedingReminders) {
        try {
          const reminder = await createVaccineReminder({
            vaccine_name: vaccine.name,
            vaccine_icon: vaccine.emoji,
            reminder_date: computeReminderDate(vaccine.name, dueDate, weeksPregnant),
            dose_number: 1,
            total_doses: vaccine.total_doses || 1,
            recipient: 'mother',
          });
          created.push(reminder);
        } catch (error) {
          console.error(`Error creating reminder for ${vaccine.name}:`, error);
        }
      }
      if (created.length > 0) {
        setUserReminders(prev => [...prev, ...created]);
        addToast('✓ Vaccine reminders auto-created successfully!', 'success');
      }
    } catch (error) {
      console.error('Error in manual auto-setup:', error);
      addToast('Error creating vaccine reminders. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="vaccines-container">
        <VaccinesHeader onBack={() => navigate('/pregnant/home')} showKhopCard={false} />
        <div className="vaccines-main" style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading vaccines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vaccines-container">
      {/* Khop Card Modal */}
      <KhopCard
        isOpen={showKhopCard}
        onClose={() => setShowKhopCard(false)}
        personName={user?.full_name || 'Mother'}
        dateLabel="अपेक्षित मिति :"
        dateValue={dueDate}
        ageLabel={weeksPregnant > 0 ? `Week ${weeksPregnant} of pregnancy` : 'Pregnant'}
        completedVaccines={userReminders.filter(v => v.status === 'completed')}
      />

      <VaccinesHeader
        onBack={() => navigate('/pregnant/home')}
        onKhopCard={() => setShowKhopCard(true)}
        onAddVaccine={() => setShowAddVaccine(true)}
      />

      <div className="vaccines-main">
        <div className="vaccine-stats">
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number">✓</p>
            <p className="vaccine-stat-label">{stats.completed} Completed</p>
          </div>
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number">⏱</p>
            <p className="vaccine-stat-label">{stats.pending} Pending</p>
          </div>
          <div className="vaccine-stat-card">
            <p className="vaccine-stat-number">{stats.overdue}</p>
            <p className="vaccine-stat-label">Overdue</p>
          </div>
        </div>

        <div className="vaccine-tabs">
          <button
            className={`vaccine-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Vaccines
          </button>
          <button
            className={`vaccine-tab-btn ${activeTab === 'recommended' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommended')}
          >
            ⭐ Recommended
          </button>
          <button
            className={`vaccine-tab-btn ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ✓ Completed
          </button>
          <button
            className="vaccine-tab-btn auto-setup-btn"
            onClick={handleManualAutoSetup}
            disabled={loading}
            title="Automatically calculate vaccine dates based on your due date"
          >
            🔄 Auto-Setup
          </button>
        </div>

        <div className="vaccine-cards-list">
          {filteredVaccines.length > 0 ? (
            filteredVaccines.map((vaccine) => {
              const originalVaccine = allVaccines.find(v => v.name === vaccine.vaccine_name);
              const isCustom = !originalVaccine;

              return (
                <VaccineCard
                  key={`reminder-${vaccine.id}`}
                  id={vaccine.id}
                  name={vaccine.vaccine_name}
                  emoji={vaccine.vaccine_icon || '💉'}
                  description={vaccine.description}
                  dueDate={vaccine.reminder_date}
                  status={vaccine.status}
                  forPerson="Mother"
                  details={vaccine.total_doses ? `${vaccine.dose_number || 1} of ${vaccine.total_doses}` : 'Single dose'}
                  isDueWithinWeek={isDueWithinWeek(vaccine.reminder_date)}
                  recommended={originalVaccine?.recommended || false}
                  onMarkDone={() => handleMarkDone(vaccine.id)}
                  onUndo={() => handleUndoDone(vaccine.id)}
                  onDelete={isCustom ? () => handleDeleteVaccine(vaccine.id, vaccine.vaccine_name) : null}
                  onInfo={() => setInfoVaccine({
                    ...(originalVaccine || { name: vaccine.vaccine_name, emoji: vaccine.vaccine_icon, description: vaccine.description }),
                    emoji: vaccine.vaccine_icon || '💉',
                    enrichment: VACCINE_ENRICHMENT[vaccine.vaccine_name] || null,
                  })}
                />
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              <p>No vaccines found</p>
            </div>
          )}
        </div>

        {activeTab !== 'completed' && vaccinesToAvoid.length > 0 && (
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

      {/* Vaccine Info Modal */}
      {infoVaccine && (
        <VaccineInfoModal
          vaccine={infoVaccine}
          enrichment={infoVaccine.enrichment}
          onClose={() => setInfoVaccine(null)}
        />
      )}

      {/* Add Vaccine Modal */}
      <AddVaccineModal
        isOpen={showAddVaccine}
        onClose={() => setShowAddVaccine(false)}
        onAdd={handleAddVaccine}
        recipient="mother"
      />

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
