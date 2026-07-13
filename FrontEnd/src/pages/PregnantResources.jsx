import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';
import { getMotherVaccines } from '../api';
import '../styles/Vaccines.css';

export default function PregnantResources() {
  const navigate = useNavigate();
  const [vaccinesToAvoid, setVaccinesToAvoid] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vaccines = await getMotherVaccines();
        setVaccinesToAvoid(vaccines.filter(v => v.emoji === '⚠️') || []);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="vaccines-container">
      <div className="vaccines-header">
        <button className="vaccines-header-back" onClick={() => navigate('/pregnant/home')}>
          <ArrowLeft size={20} />
        </button>
        <div className="vaccines-header-content">
          <h1>Resources & Safety</h1>
          <p>Emergency info & vaccine safety</p>
        </div>
      </div>

      <div className="vaccines-main">

        {!loading && vaccinesToAvoid.length > 0 && (
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

        {loading && (
          <div className="vaccine-loading">
            <div className="vaccine-loading-line wide" />
            <div className="vaccine-loading-line medium" />
          </div>
        )}
      </div>

      <BottomNavigation activeTab="Vaccines" userType="pregnant" />
    </div>
  );
}
