import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import EmergencySignsList from '../components/pregnancy/EmergencySignsList';
import '../styles/Pregnancy.css';

export default function PregnantEmergency() {
  const navigate = useNavigate();

  return (
    <div className="emergency-page">
      <div className="emergency-page-header">
        <button className="emergency-page-header-back" onClick={() => navigate('/pregnant/home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="emergency-page-header-content">
          <h1>Emergency Warning Signs</h1>
          <p>Know when to seek immediate medical help</p>
        </div>
      </div>

      <div className="emergency-page-content">
        <EmergencySignsList />
      </div>

      <BottomNavigation activeTab="Home" userType="pregnant" />
    </div>
  );
}
