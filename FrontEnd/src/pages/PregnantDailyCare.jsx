import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import DailyChecklist from '../components/pregnancy/DailyChecklist';
import TodayTips from '../components/pregnancy/TodayTips';
import '../styles/Vaccines.css';
import '../styles/Pregnancy.css';

export default function PregnantDailyCare() {
  const navigate = useNavigate();

  return (
    <div className="vaccines-container">
      <div className="vaccines-header">
        <button className="vaccines-header-back" onClick={() => navigate('/pregnant/home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="vaccines-header-content">
          <h1>Daily Care</h1>
          <p>Checklist & wellness tips</p>
        </div>
      </div>

      <div className="vaccines-main">
        <TodayTips />
        <DailyChecklist />
      </div>

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
