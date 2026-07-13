import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { getCurrentUser } from '../api';
import { calculateTrimester } from '../data/pregnancyUtils';
import MedicalTests from '../components/pregnancy/MedicalTests';
import '../styles/Vaccines.css';
import '../styles/Pregnancy.css';

export default function PregnantHealth() {
  const navigate = useNavigate();
  const [currentTrimester, setCurrentTrimester] = useState('Trimester 1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        const { trimester } = calculateTrimester(userData.due_date);
        setCurrentTrimester(trimester);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="vaccines-container">
      <div className="vaccines-header">
        <button className="vaccines-header-back" onClick={() => navigate('/pregnant/home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="vaccines-header-content">
          <h1>Medical Tests</h1>
          <p>Trimester-by-trimester screenings</p>
        </div>
      </div>

      <div className="vaccines-main">
        {loading ? (
          <div className="vaccine-loading">
            <div className="vaccine-loading-line wide" />
            <div className="vaccine-loading-line medium" />
          </div>
        ) : (
          <MedicalTests currentTrimester={currentTrimester} />
        )}
      </div>

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
