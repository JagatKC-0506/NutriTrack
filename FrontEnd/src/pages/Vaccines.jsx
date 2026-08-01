/**
 * VACCINES PAGE COMPONENT
 * =======================
 * Displays vaccine tracker with status tracking
 * Shows completed, pending, and upcoming vaccines
 * Fully modular with reusable sub-components
 */

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
import { useBabyContext } from '../context/BabyContext';
import { getAllVaccines, getUserVaccineReminders, createVaccineReminder, updateVaccineReminderStatus, deleteVaccineReminder } from '../api';
import { calculateBabyAgeDetailed } from '../utils/babyAge';
import vaccineScheduleConfig, { getNextDoseDate, generateAutomaticVaccineReminders, calculateVaccineDateFromBirth } from '../utils/vaccineSchedule';
import '../styles/Vaccines.css';

export default function Vaccines() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('thismonth');
  const { addToast } = useToast();
  const { babies, selectedBaby, setSelectedBaby } = useBabyContext();
  const [allVaccines, setAllVaccines] = useState([]);
  const [userReminders, setUserReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showKhopCard, setShowKhopCard] = useState(false);
  const [infoVaccine, setInfoVaccine] = useState(null);
  const [lastAutoCreatedDose, setLastAutoCreatedDose] = useState(null);
  const [showAddVaccine, setShowAddVaccine] = useState(false);

  useEffect(() => {
    if (!selectedBaby && babies && babies.length > 0) {
      setSelectedBaby(babies[0]);
    }
  }, [babies, selectedBaby, setSelectedBaby]);
  
  // Fetch all available vaccines and user reminders on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [vaccinesData, remindersData] = await Promise.all([
          getAllVaccines(),
          selectedBaby ? getUserVaccineReminders(selectedBaby.id).catch(() => []) : Promise.resolve([])
        ]);
        
        setAllVaccines(vaccinesData || []);
        setUserReminders(remindersData || []);
        setLoading(false);

        // Check if auto-setup was done for this baby using localStorage
        // Use baby ID to support multiple babies
        const autoSetupKey = selectedBaby ? `vaccine_auto_setup_baby_${selectedBaby.id}` : null;
        const autoSetupDone = autoSetupKey ? localStorage.getItem(autoSetupKey) : false;
        
        // Only auto-create reminders if not done before for this baby
        if (!autoSetupDone) {
          const babyDOB = selectedBaby ? selectedBaby.date_of_birth : null;
          if (babyDOB && vaccinesData && vaccinesData.length > 0) {
            // Run auto-setup in background to avoid blocking UI
            setTimeout(() => {
              autoCreateAllVaccineReminders(vaccinesData, remindersData || [], babyDOB)
                .then(() => {
                  if (autoSetupKey) {
                    localStorage.setItem(autoSetupKey, 'true');
                  }
                })
                .catch((error) => {
                  console.error('Error in auto-setup:', error);
                });
            }, 0);
            // Mark auto-setup as done for this baby
            if (autoSetupKey) {
              localStorage.setItem(autoSetupKey, 'true');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching vaccine data:', error);
      }
    };

    fetchData();
  }, [selectedBaby]);

  const handleManualAutoSetup = async () => {
    if (!selectedBaby || !allVaccines.length) {
      addToast('Please select a baby first', 'error');
      return;
    }

    setLoading(true);
    try {
      await autoCreateAllVaccineReminders(allVaccines, userReminders, selectedBaby.date_of_birth);
      // Mark auto-setup as done for this baby
      const autoSetupKey = `vaccine_auto_setup_baby_${selectedBaby.id}`;
      localStorage.setItem(autoSetupKey, 'true');
      
      // Refresh vaccine reminders to show newly created reminders
      const remindersData = await getUserVaccineReminders(selectedBaby?.id);
      setUserReminders(remindersData || []);
      
      addToast('✓ Vaccine reminders auto-created successfully!', 'success');
    } catch (error) {
      console.error('Error in manual auto-setup:', error);
      addToast('Error creating vaccine reminders. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Function to check if vaccine is due within 7 days
  const isDueWithinWeek = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    return daysRemaining > 0 && daysRemaining <= 7;
  };

  // Check if a vaccine due date falls within the current calendar month
  const isDueThisMonth = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    if (Number.isNaN(dueDate.getTime())) return false;
    const today = new Date();
    return dueDate.getFullYear() === today.getFullYear() && dueDate.getMonth() === today.getMonth();
  };

  // Auto-create reminders for vaccines that don't have them yet
  const autoCreateAllVaccineReminders = async (vaccines, existingReminders, babyBirthDate) => {
    try {
      if (!babyBirthDate) {
        console.log('No baby birth date available for auto-setup');
        setUserReminders(existingReminders);
        return;
      }

      // Find vaccines that don't have any reminders yet
      const vaccinesWithReminders = new Set(existingReminders.map(r => r.vaccine_name));
      const vaccinesNeedingReminders = vaccines.filter(v => !vaccinesWithReminders.has(v.name));

      if (vaccinesNeedingReminders.length === 0) {
        console.log('All vaccines already have reminders');
        setUserReminders(existingReminders);
        return;
      }

      console.log(`Auto-creating reminders for ${vaccinesNeedingReminders.length} vaccines...`);

      // Create reminders for each vaccine without reminders
      const createdReminders = [];
      for (const vaccine of vaccinesNeedingReminders) {
        try {
          // Generate reminder data for all doses
          const reminderDataList = generateAutomaticVaccineReminders(
            [vaccine],
            babyBirthDate,
            'baby',
            selectedBaby?.id || null
          );

          // Create all doses for this vaccine
          for (const reminderData of reminderDataList) {
            const created = await createVaccineReminder({
              ...reminderData,
              baby_id: selectedBaby?.id || null,
            });
            createdReminders.push(created);
          }
        } catch (error) {
          console.error(`Error creating reminder for ${vaccine.name}:`, error);
        }
      }

      // Update state with all reminders (existing + newly created)
      const allReminders = [...existingReminders, ...createdReminders];
      setUserReminders(allReminders);

      // Show success notification
      if ('Notification' in window && Notification.permission === 'granted') {
        NotificationService.sendNotification(
          'Vaccine Reminders Created! 🎉',
          {
            body: `${createdReminders.length} vaccine reminders auto-created.`,
            tag: 'vaccine-auto-setup',
          }
        );
      }
    } catch (error) {
      console.error('Error in auto-create vaccine reminders:', error);
      setUserReminders(existingReminders);
    }
  };

  // Get display vaccines: scheduled reminders + available vaccines with no reminders
  const displayVaccines = useMemo(() => {
    // Deduplicate userReminders by vaccine_name + dose_number combination
    // Keep the most recent version if duplicates exist
    const reminderMap = new Map();
    userReminders.forEach(reminder => {
      const key = `${reminder.vaccine_name}|${reminder.dose_number || 1}`;
      
      // If key doesn't exist, or new reminder is more recent, update it
      if (!reminderMap.has(key)) {
        reminderMap.set(key, reminder);
      } else {
        const existing = reminderMap.get(key);
        // Compare by updatedAt or id to keep the most recent
        const existingTime = existing.updatedAt ? new Date(existing.updatedAt).getTime() : existing.id;
        const newTime = reminder.updatedAt ? new Date(reminder.updatedAt).getTime() : reminder.id;
        
        if (newTime > existingTime) {
          reminderMap.set(key, reminder);
        }
      }
    });

    const uniqueReminders = Array.from(reminderMap.values());

    // Track vaccines already scheduled
    const vaccinesWithReminders = new Set(uniqueReminders.map(r => r.vaccine_name));

    // Build display list starting with reminders - add recommended property from original vaccine data
    const displayVaccines = uniqueReminders.map(reminder => {
      const originalVaccine = allVaccines.find(v => v.name === reminder.vaccine_name);
      return {
        ...reminder,
        recommended: originalVaccine?.recommended || false
      };
    });

    // Add available vaccines that have no reminders yet (only baby vaccines)
    allVaccines.forEach(vaccine => {
      // Filter out mother vaccines - only show baby vaccines
      if (vaccine.recipient_type === 'mother') {
        return;
      }

      if (!vaccinesWithReminders.has(vaccine.name)) {
        // Estimate first dose date from baby's DOB using schedule config
        let reminderDate = '';
        const schedule = vaccineScheduleConfig[vaccine.name];
        const firstDose = schedule?.spacing?.[0];
        if (firstDose && selectedBaby?.date_of_birth) {
          const date = calculateVaccineDateFromBirth(selectedBaby.date_of_birth, firstDose.ageMonths);
          if (date) {
            reminderDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          }
        }

        displayVaccines.push({
          id: `available-${vaccine.id || vaccine.name}`,
          vaccine_name: vaccine.name,
          vaccine_icon: vaccine.emoji,
          description: vaccine.description,
          reminder_date: reminderDate,
          status: 'available',
          recipient: 'baby',
          recipient_type: vaccine.recipient_type,
          total_doses: vaccine.total_doses,
          dose_number: 0,
          recommended: vaccine.recommended,
        });
      }
    });

    return displayVaccines;
  }, [userReminders, allVaccines, selectedBaby]);

  // Filter vaccines based on active tab
  const filteredVaccines = useMemo(() => {
    
    // Show only completed vaccines
    if (activeTab === 'completed') {
      return displayVaccines.filter(v => v.status === 'completed');
    }

    // Show only overdue vaccines
    if (activeTab === 'overdue') {
      return displayVaccines.filter(v => v.status === 'overdue');
    }

    // This Month: vaccines due in the current calendar month (overdue live in their own tab)
    if (activeTab === 'thismonth') {
      return displayVaccines.filter(v => v.status !== 'completed' && v.status !== 'overdue' && isDueThisMonth(v.reminder_date));
    }
    
    // Hide completed vaccines from other tabs
    const nonCompletedVaccines = displayVaccines.filter(v => v.status !== 'completed');
    
    let list;
    if (activeTab === 'recommended') {
      list = nonCompletedVaccines.filter(v => v.recommended === true);
    } else {
      list = nonCompletedVaccines;
    }
    return list;
  }, [displayVaccines, activeTab]);

  // Vaccine statistics for header cards (aligned with displayed data)
  const stats = useMemo(() => ({
    completed: displayVaccines.filter(v => v.status === 'completed').length,
    pending: displayVaccines.filter(v => v.status !== 'completed').length,
    overdue: displayVaccines.filter(v => v.status === 'overdue').length,
  }), [displayVaccines]);

  const handleMarkDone = async (id) => {
    try {
      const vaccineToMark = userReminders.find(v => v.id === id);
      if (!vaccineToMark) return;

      // OPTIMISTIC UPDATE: Update local state immediately for instant UI feedback
      // This fixes the mobile app delay issue where UI wouldn't update until navigating away
      const updatedReminders = userReminders.map(reminder => 
        reminder.id === id 
          ? { 
              ...reminder, 
              status: 'completed',
              last_dose_date: new Date().toISOString().split('T')[0]
            }
          : reminder
      );
      setUserReminders(updatedReminders);

      // Step 1: Mark current dose as completed on backend
      await updateVaccineReminderStatus(id, {
        status: 'completed',
        last_dose_date: new Date().toISOString(),
      });

      // Send notification when vaccine is completed
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

      // Step 2: Check if next dose needs to be created
      const currentDose = vaccineToMark.dose_number || 1;
      const totalDoses = vaccineToMark.total_doses || 1;

      if (currentDose < totalDoses) {
        // Check if next dose already exists
        const nextDoseExists = updatedReminders.some(
          r => r.vaccine_name === vaccineToMark.vaccine_name && 
               r.dose_number === currentDose + 1 &&
               (r.baby_id || null) === (selectedBaby?.id || null)
        );

        if (!nextDoseExists) {
          // Calculate next dose date
          const baseDate = vaccineToMark.last_dose_date || vaccineToMark.reminder_date || new Date().toISOString().split('T')[0];
          const nextDoseDate = getNextDoseDate(
            vaccineToMark.vaccine_name,
            currentDose,
            baseDate
          );

          if (nextDoseDate) {
            // Create next dose reminder (nextDoseDate is already a YYYY-MM-DD string)
            const nextDoseReminder = {
              vaccine_name: vaccineToMark.vaccine_name,
              reminder_date: nextDoseDate,
              dose_number: currentDose + 1,
              total_doses: totalDoses,
              recipient: vaccineToMark.recipient,
              age_due_months: 0,
              description: vaccineToMark.description,
              vaccine_icon: vaccineToMark.vaccine_icon,
              baby_id: selectedBaby?.id || null,
            };

            const newDose = await createVaccineReminder(nextDoseReminder);
            
            // Track the auto-created dose so it can be cleaned up on undo
            setLastAutoCreatedDose({ doseId: newDose.id, vaccineName: vaccineToMark.vaccine_name, doseNumber: currentDose + 1 });
            
            // Update state with the new dose
            setUserReminders(prev => [...prev, newDose]);

            // Notify about next dose
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
      }

      // Step 3: Refresh all vaccine reminders from server to sync with backend
      // This ensures we have the latest state and handles any edge cases
      const refreshedReminders = await getUserVaccineReminders(selectedBaby?.id);
      setUserReminders(refreshedReminders || []);
    } catch (error) {
      console.error('Error marking vaccine as done:', error);
      // Refresh state from server if error occurs to ensure consistency
      try {
        const refreshedReminders = await getUserVaccineReminders(selectedBaby?.id);
        setUserReminders(refreshedReminders || []);
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

      const refreshedReminders = await getUserVaccineReminders(selectedBaby?.id);
      setUserReminders(refreshedReminders || []);

      addToast(`↩ ${vaccineToUndo.vaccine_name} marked as not done`, 'info');
    } catch (error) {
      console.error('Error undoing vaccine completion:', error);
      try {
        const refreshedReminders = await getUserVaccineReminders(selectedBaby?.id);
        setUserReminders(refreshedReminders || []);
      } catch (refreshError) {
        console.error('Error refreshing vaccine reminders after undo failure:', refreshError);
      }
      addToast('Failed to undo. Please try again.', 'error');
    }
  };

  const handleAddVaccine = async (vaccineData) => {
    if (!selectedBaby) {
      addToast('Please select a baby first', 'error');
      throw new Error('No baby selected');
    }
    const created = await createVaccineReminder({ ...vaccineData, baby_id: selectedBaby.id });
    const refreshed = await getUserVaccineReminders(selectedBaby.id);
    setUserReminders(refreshed || []);
    addToast(`✓ ${created.vaccine_name} added`, 'success');
  };

  const handleDeleteVaccine = async (id, name) => {
    if (!window.confirm(`Delete ${name}? This cannot be undone.`)) return;
    try {
      await deleteVaccineReminder(id);
      const refreshed = await getUserVaccineReminders(selectedBaby?.id);
      setUserReminders(refreshed || []);
      addToast(`🗑️ ${name} deleted`, 'info');
    } catch (error) {
      console.error('Error deleting vaccine:', error);
      addToast('Failed to delete vaccine', 'error');
    }
  };

  if (loading) {
    return (
      <div className="vaccines-container">
        <VaccinesHeader onBack={() => navigate('/home')} />
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
        personName={selectedBaby?.name || 'Baby'}
        dateValue={selectedBaby?.date_of_birth}
        ageLabel={calculateBabyAgeDetailed(selectedBaby?.date_of_birth).label}
        completedVaccines={userReminders.filter(v => v.status === 'completed')}
      />

      {/* Vaccines Header */}
      <VaccinesHeader 
        onBack={() => navigate('/home')}
        onKhopCard={() => setShowKhopCard(true)}
        onAddVaccine={() => setShowAddVaccine(true)}
      />

      {babies && babies.length > 1 && (
        <div className="baby-selector-container">
          <label className="baby-selector-label" htmlFor="vaccines-baby-select">Select Baby</label>
          <select
            id="vaccines-baby-select"
            className="baby-selector-dropdown"
            value={selectedBaby?.id || ''}
            onChange={(event) => {
              const selectedId = parseInt(event.target.value, 10);
              const nextBaby = babies.find(b => b.id === selectedId);
              if (nextBaby) {
                setSelectedBaby(nextBaby);
              }
            }}
          >
            {babies.map((baby) => (
              <option key={baby.id} value={baby.id}>
                {baby.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Main Content */}
      <div className="vaccines-main">
        
        {/* Vaccination Stats */}
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

        {/* Tab Selection */}
        <div className="vaccine-tabs vaccine-tabs-grid">
          <button 
            className={`vaccine-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All
          </button>
          <button 
            className={`vaccine-tab-btn ${activeTab === 'overdue' ? 'active' : ''}`}
            onClick={() => setActiveTab('overdue')}
          >
            ⚠ Overdue
          </button>
          <button 
            className={`vaccine-tab-btn ${activeTab === 'thismonth' ? 'active' : ''}`}
            onClick={() => setActiveTab('thismonth')}
          >
            📅 This Month
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
            disabled={!selectedBaby || loading}
            title="Automatically calculate vaccine dates based on baby's birth date"
          >
            🔄 Auto-Setup
          </button>
        </div>

        {/* Vaccines List */}
        <div className="vaccine-cards-list">
          {filteredVaccines.length > 0 ? (
            filteredVaccines.map((vaccine) => {
              // Find the original vaccine data to get 'recommended' status
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
                  forPerson="Baby"
                  details={vaccine.total_doses ? `${vaccine.dose_number || 1} of ${vaccine.total_doses}` : 'Single dose'}
                  isDueWithinWeek={isDueWithinWeek(vaccine.reminder_date)}
                  recommended={originalVaccine?.recommended || false}
                  onMarkDone={() => handleMarkDone(vaccine.id)}
                  onUndo={() => handleUndoDone(vaccine.id)}
                  onDelete={isCustom ? () => handleDeleteVaccine(vaccine.id, vaccine.vaccine_name) : null}
                  onInfo={() => setInfoVaccine(originalVaccine || { name: vaccine.vaccine_name, emoji: vaccine.vaccine_icon, description: vaccine.description })}
                />
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
              <p>No vaccines found</p>
            </div>
          )}
        </div>
      </div>

      {/* Vaccine Info Modal */}
      {infoVaccine && (
        <VaccineInfoModal
          vaccine={infoVaccine}
          onClose={() => setInfoVaccine(null)}
        />
      )}

      {/* Add Vaccine Modal */}
      <AddVaccineModal
        isOpen={showAddVaccine}
        onClose={() => setShowAddVaccine(false)}
        onAdd={handleAddVaccine}
        recipient="baby"
        babyId={selectedBaby?.id || null}
      />

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="Vaccines" />
    </div>
  );
}
