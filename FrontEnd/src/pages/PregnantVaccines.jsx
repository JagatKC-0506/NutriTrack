import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { getCurrentUser, getMotherVaccines, getUserVaccineReminders } from '../api';
import { calculateTrimester, getVaccineStatus } from '../data/pregnancyUtils';
import VACCINE_ENRICHMENT from '../data/vaccineEnrichment';
import PregnancyDashboard from '../components/pregnancy/PregnancyDashboard';
import SummaryCards from '../components/pregnancy/SummaryCards';
import '../styles/Vaccines.css';
import '../styles/Pregnancy.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PregnantVaccines() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [currentTrimester, setCurrentTrimester] = useState('Trimester 1');
  const [weeksPregnant, setWeeksPregnant] = useState(0);
  const [loading, setLoading] = useState(true);
  const [motherVaccines, setMotherVaccines] = useState([]);
  const [userReminders, setUserReminders] = useState([]);

  const fetchUserReminders = useCallback(async () => {
    try {
      const reminders = await getUserVaccineReminders();
      setUserReminders(reminders.filter(r => r.recipient === 'mother') || []);
    } catch (error) {
      console.error('Error fetching reminders:', error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, vaccines] = await Promise.all([
          getCurrentUser(),
          getMotherVaccines(),
        ]);
        setUser(userData);
        const { trimester, weeksPregnant: weeks } = calculateTrimester(userData.due_date);
        setCurrentTrimester(trimester);
        setWeeksPregnant(weeks);
        setMotherVaccines(vaccines);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    fetchUserReminders();
  }, [fetchUserReminders]);

  const recommendedVaccines = useMemo(
    () => motherVaccines.filter(v => v.recommended && v.emoji !== '⚠️'),
    [motherVaccines]
  );

  const completedCount = useMemo(() => {
    return recommendedVaccines.filter(v =>
      userReminders.find(r => r.vaccine_name === v.name && r.status === 'completed')
    ).length;
  }, [recommendedVaccines, userReminders]);

  const completedPercent = useMemo(
    () => recommendedVaccines.length > 0
      ? Math.round((completedCount / recommendedVaccines.length) * 100)
      : 0,
    [completedCount, recommendedVaccines.length]
  );

  const dueSoonCount = useMemo(() => {
    return recommendedVaccines.filter(v => {
      const enrichment = VACCINE_ENRICHMENT[v.name];
      const status = getVaccineStatus(v.name, weeksPregnant, userReminders, enrichment);
      return status === 'due-soon' || status === 'overdue';
    }).length;
  }, [recommendedVaccines, weeksPregnant, userReminders]);

  const totalTests = useMemo(() => {
    const tests = { 'Trimester 1': 6, 'Trimester 2': 4, 'Trimester 3': 5 };
    return tests[currentTrimester] || 3;
  }, [currentTrimester]);

  if (loading) {
    return (
      <div className="vaccines-container">
        <div className="vaccines-header">
          <button className="vaccines-header-back" onClick={() => navigate('/home')}>
            <ArrowLeft size={20} />
          </button>
          <div className="vaccines-header-content">
            <h1>Prenatal Health</h1>
            <p>Loading your dashboard...</p>
          </div>
        </div>
        <div className="vaccines-main">
          <div className="vaccine-loading">
            <div className="vaccine-loading-line wide" />
            <div className="vaccine-loading-line medium" />
            <div className="vaccine-loading-line" />
            <div className="vaccine-loading-line wide" />
            <div className="vaccine-loading-line medium" />
          </div>
        </div>
        <BottomNavigation activeTab="Vaccines" userType="pregnant" />
      </div>
    );
  }

  return (
    <div className="vaccines-container">
      <div className="vaccines-header">
        <button className="vaccines-header-back" onClick={() => navigate('/home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="vaccines-header-content">
          <h1>Prenatal Health</h1>
          <p>{currentTrimester} {weeksPregnant > 0 ? `- Week ${weeksPregnant}` : ''}</p>
        </div>
      </div>

      <div className="vaccines-main">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <PregnancyDashboard dueDate={user?.due_date} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SummaryCards
              completedVaccines={completedCount}
              totalRecommended={recommendedVaccines.length}
              upcomingAppointments={dueSoonCount}
              pendingTests={totalTests}
              completionPercent={completedPercent}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="pregnancy-dashboard-quick-info">
              <Shield size={16} />
              <span>
                {completedCount} of {recommendedVaccines.length} vaccines completed
                {dueSoonCount > 0 ? ` · ${dueSoonCount} due soon` : ''}
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
