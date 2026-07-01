/**
 * HOME PAGE COMPONENT
 * ===================
 * Main dashboard/home page for NutriTrack app
 * Displays greeting, reminders, and notifications
 * Fully modular with reusable sub-components
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GreetingCard from '../components/GreetingCard';
import BabyProfileCard from '../components/BabyProfileCard';
import ReminderCard from '../components/ReminderCard';
import NotificationCard from '../components/NotificationCard';
import NotificationBanner from '../components/NotificationBanner';
import LoadingSpinner from '../components/LoadingSpinner';
import BottomNavigation from '../components/BottomNavigation';
import NotificationService from '../services/NotificationService';
import { useBabyContext } from '../context/BabyContext';
import { getReminders, getCurrentUser, getAuthToken, getUserVaccineReminders } from '../api';
import { isVaccineDueWithin } from '../utils/vaccineSchedule';
import { calculateBabyAgeDetailed, getBabyAgeMonths } from '../utils/babyAge';
import '../styles/Home.css';
import '../styles/NotificationCard.css';

const HOME_USER_TYPE = 'newParent';

export default function Home() {
  const navigate = useNavigate();
  const { babies, selectedBaby, setSelectedBaby, refreshBabies } = useBabyContext();
  const storedUserType = localStorage.getItem('userType') || localStorage.getItem('selectedStage');
  
  // State for notification permission
  const [notificationPermission, setNotificationPermission] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    userName: "Loading...",
    trimester: "Baby Age",
    dueDate: null,
    weeksPregnant: null,
    userType: HOME_USER_TYPE,
    babyAgeLabel: 'Age unknown',
    babyAgeMonths: null,
    babyAgeWeeks: null,
    babyDob: null
  });

  // Vaccine data placeholder; should be populated from backend schedule
  const [vaccinesData, setVaccinesData] = useState([]);

  const fetchRemindersData = async () => {
    try {
      const [remindersData, vaccineRemindersData] = await Promise.all([
        getReminders().catch(() => []),
        selectedBaby ? getUserVaccineReminders(selectedBaby.id).catch(() => []) : Promise.resolve([])
      ]);
      
      const allRemindersList = [...remindersData, ...vaccineRemindersData];
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0);
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + 14);
      
      const todayReminders = allRemindersList.filter(r => {
        const reminderDate = new Date(r.reminder_date);
        return reminderDate >= todayStart && reminderDate <= futureDate;
      });
      
      const reminderMap = new Map();
      todayReminders.forEach(r => {
        const reminderDateTime = new Date(r.reminder_date).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });
        const key = `${r.title || r.vaccine_name}|${reminderDateTime}`;
        if (!reminderMap.has(key)) reminderMap.set(key, r);
      });
      
      const uniqueReminders = Array.from(reminderMap.values());
      uniqueReminders.sort((a, b) => new Date(a.reminder_date) - new Date(b.reminder_date));
      
      setReminders(uniqueReminders.map(r => ({
        id: r.id,
        title: r.title || r.vaccine_name,
        description: r.description || (r.dose_number ? `Dose ${r.dose_number} of ${r.total_doses}` : ''),
        formattedDate: new Date(r.reminder_date).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }),
        icon: (r.type === 'vaccine' || r.vaccine_name) ? '💉' : '📅'
      })));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initializeAndFetchData = async () => {
      try {
        const token = getAuthToken();
        if (!token) {
          if (isMounted) {
            setUserData(prev => ({ ...prev, userName: "Guest" }));
            setLoading(false);
          }
          return;
        }

        const hasPermission = await NotificationService.initialize();
        if (isMounted) setNotificationPermission(hasPermission);

        const user = await getCurrentUser();
        const serverUserType = user.user_type || storedUserType;
        if (serverUserType === 'pregnant') {
          localStorage.setItem('userType', 'pregnant');
          navigate('/pregnant/home');
          return;
        }

        localStorage.setItem('userType', HOME_USER_TYPE);
        
        let babyAgeLabel = 'Age unknown', babyAgeMonths = null, babyAgeWeeks = null, babyDob = null;
        if (selectedBaby && selectedBaby.date_of_birth) {
          babyDob = selectedBaby.date_of_birth;
          const babyAge = calculateBabyAgeDetailed(babyDob);
          babyAgeLabel = babyAge.label;
          babyAgeMonths = getBabyAgeMonths(babyDob);
          babyAgeWeeks = babyAge.weeks;
        }

        if (isMounted) {
          setUserData({
            userName: user.full_name || "User",
            trimester: babyAgeLabel,
            dueDate: null,
            weeksPregnant: null,
            userType: HOME_USER_TYPE,
            babyAgeLabel: babyAgeLabel,
            babyAgeMonths: babyAgeMonths,
            babyAgeWeeks: babyAgeWeeks,
            babyDob: babyDob
          });
        }

        const [remindersData, vaccineRemindersData] = await Promise.all([
          getReminders().catch(() => []),
          selectedBaby ? getUserVaccineReminders(selectedBaby.id).catch(() => []) : Promise.resolve([])
        ]);
        
        if (isMounted) {
          setVaccinesData(vaccineRemindersData || []);
          const upcomingVaccines = (vaccineRemindersData || []).filter(vaccine => 
            vaccine.status !== 'completed' && isVaccineDueWithin(vaccine.reminder_date, 7)
          );
          if (upcomingVaccines.length > 0 && hasPermission) {
            setTimeout(() => {
              upcomingVaccines.forEach(vaccine => {
                NotificationService.sendNotification(
                  `💉 ${vaccine.vaccine_name} - Dose ${vaccine.dose_number}`,
                  {
                    body: `Due on ${new Date(vaccine.reminder_date).toDateString()}`,
                    tag: `vaccine-reminder-${vaccine.id}`,
                  }
                );
              });
            }, 1000);
          }
        }
        
        await fetchRemindersData();
        if (isMounted) setLoading(false);
      } catch (error) {
        console.error('Error in initializeAndFetchData:', error);
        if (isMounted) setLoading(false);
      }
    };
    initializeAndFetchData();
    return () => { isMounted = false; };
  }, [selectedBaby, navigate, storedUserType]); 

  if (loading) {
    return (
      <div className="home-container">
        <LoadingSpinner message="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Main Content */}
      <div className="home-content">
        
        {/* Notification Permission Banner */}
        <NotificationBanner 
          onPermissionChange={(granted) => setNotificationPermission(granted)}
        />

        {/* Greeting Section */}
        <GreetingCard 
          userName={userData.userName}
          trimester={userData.trimester}
          dueDate={userData.dueDate}
          weeksPregnant={userData.weeksPregnant}
          userType={HOME_USER_TYPE}
          babyAgeLabel={userData.babyAgeLabel}
          babyAgeMonths={userData.babyAgeMonths}
          babyAgeWeeks={userData.babyAgeWeeks}
          babyDob={userData.babyDob}
        />

        {babies && babies.length > 1 && (
          <div className="home-baby-selector">
            <label htmlFor="home-baby-select">Select Baby</label>
            <select
              id="home-baby-select"
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

        {/* Baby Profile Card - Shows age graph and DOB */}
        <BabyProfileCard
          babyAgeLabel={userData.babyAgeLabel}
          babyAgeMonths={userData.babyAgeMonths}
          babyDob={userData.babyDob}
        />

        {/* Vaccine Notifications - Shows alerts for vaccines due within 7 days */}
        <NotificationCard 
          vaccinesData={vaccinesData}
          onDismiss={() => console.log('Notification dismissed')}
        />

        {/* Reminders Section */}
        <ReminderCard 
          reminders={reminders} 
          onReminderDeleted={fetchRemindersData}
        />
      </div>

      {/* Floating Add Baby Button */}
      <button 
        className="floating-add-button"
        onClick={() => navigate('/add-baby')}
        title="Add Baby"
        aria-label="Add Baby"
      >
        +
      </button>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="Home" userType={HOME_USER_TYPE} />
    </div>
  );
}
